import { Component } from "@angular/core";
import { c } from "@angular/core/src/render3";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AddressDTO } from "../../models/address.dto";
import { PedidoDTO } from "../../models/pedido.dto";
import { CartService } from "../../service/domain/cart.service";
import { ClientService } from "../../service/domain/client.service";
import { StorageService } from "../../service/storage.service";

@IonicPage()
@Component({
  selector: "page-address-pick",
  templateUrl: "address-pick.html",
})
export class AddressPickPage {
  items: AddressDTO[];
  pedido: PedidoDTO;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService,
    public cartService: CartService
  ) {}

  ionViewDidLoad() {
    let user = this.storage.getLocalStorageUser();
    console.log(user);
    if (user && user.email) {
      this.clientService.findByEmail(user.email).subscribe(
        (response) => {
          this.items = response["addresses"];

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: { id: response["id"] },
            deliveryAddress: null,
            payment: null,
            itens: cart.items.map((x) => {
              return { quantidade: x.quantity, produto: { id: x.product.id } };
            }),
          };
        },
        (error) => {
          if (error.status == 403) {
            this.navCtrl.setRoot("HomePage");
          }
        }
      );
    } else {
      this.navCtrl.setRoot("HomePage");
    }
  }

  nextpage(item: AddressDTO) {
    this.pedido.deliveryAddress = { id: item.id };
    this.navCtrl.push("PaymentPage", { pedido: this.pedido });
    console.log(this.pedido);
  }
}
