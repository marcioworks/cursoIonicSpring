import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PedidoDTO } from "../../models/pedido.dto";

@IonicPage()
@Component({
  selector: "page-payment",
  templateUrl: "payment.html",
})
export class PaymentPage {
  pedido: PedidoDTO;
  installments: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  formGroup: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {
    this.pedido = this.navParams.get("pedido");
    this.formGroup = this.formBuilder.group({
      numberOfInstallments: [1, Validators.required],
      "@type": ["cardPayment", Validators.required],
    });

    console.log(this.pedido);
  }

  nextPage() {
    this.pedido.payment = this.formGroup.value;
    this.navCtrl.push("OrderConfirmationPage", { pedido: this.pedido });
    console.log(this.pedido);
  }
}
