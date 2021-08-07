import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AddressDTO } from "../../models/address.dto";

@IonicPage()
@Component({
  selector: "page-address-pick",
  templateUrl: "address-pick.html",
})
export class AddressPickPage {
  items: AddressDTO[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        street: "rua 4",
        number: "350",
        complement: "ap 203",
        neighborhood: "pedras",
        city: { id: "1", name: "Fortaleza", state: { id: "1", name: "Ceara" } },
        zipcode: "60878050",
      },
      {
        id: "2",
        street: "rua das flores",
        number: "100",
        complement: "",
        neighborhood: "Ancuri",
        city: { id: "1", name: "Fortaleza", state: { id: "1", name: "Ceara" } },
        zipcode: "60787032",
      },
    ];
  }
}
