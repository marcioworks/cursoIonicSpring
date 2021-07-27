import { Component } from "@angular/core";
import { IonicPage, MenuController, NavController } from "ionic-angular";
import { CredentialsDTO } from "../../models/credentials.dto";
@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  constructor(public navCtrl: NavController, public menu: MenuController) {}

  credentials: CredentialsDTO = {
    email: "",
    password: "",
  };

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  login() {
    console.log(this.credentials);
    this.navCtrl.setRoot("CategoriesPage");
  }
}
