import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AddressDTO } from "../../models/address.dto";
import { CartItem } from "../../models/cart-item";
import { ClientDTO } from "../../models/client.dto";
import { PedidoDTO } from "../../models/pedido.dto";
import { CartService } from "../../service/domain/cart.service";
import { ClientService } from "../../service/domain/client.service";
import { PedidoService } from "../../service/domain/pedido.service";

@IonicPage()
@Component({
  selector: "page-order-confirmation",
  templateUrl: "order-confirmation.html",
})
export class OrderConfirmationPage {
  pedido: PedidoDTO;
  client: ClientDTO;
  cartItems: CartItem[];
  address: AddressDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clientService: ClientService,
    public pedidoService: PedidoService
  ) {
    this.pedido = this.navParams.get("pedido");
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clientService.findById(this.pedido.cliente.id).subscribe(
      (response) => {
        this.client = response as ClientDTO;
        this.address = this.findAddress(
          this.pedido.deliveryAddress.id,
          response["addresses"]
        );
      },
      (error) => {
        this.navCtrl.setRoot("HomePage");
      }
    );
  }

  private findAddress(id: string, list: AddressDTO[]): AddressDTO {
    let position = list.findIndex((x) => x.id == id);
    return list[position];
  }
  total() {
    return this.cartService.total();
  }

  checkout() {
    this.pedidoService.insert(this.pedido).subscribe(
      (response) => {
        this.cartService.createOrClearCart();
        console.log(response.headers.get("location"));
      },
      (error) => {
        if (error.status == 403) {
          this.navCtrl.setRoot("HomePage");
        }
      }
    );
  }

  back() {
    this.navCtrl.setRoot("CartPage");
  }
}
