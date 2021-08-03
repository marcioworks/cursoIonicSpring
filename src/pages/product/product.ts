import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ProductDTO } from "../../models/product.dto";

@IonicPage()
@Component({
  selector: "page-product",
  templateUrl: "product.html",
})
export class ProductPage {
  items: ProductDTO[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        name: "Mouse",
        price: 80,
      },
      {
        id: "2",
        name: "Teclado",
        price: 120,
      },
    ];
  }
}
