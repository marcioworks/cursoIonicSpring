import { Component } from "@angular/core";
import { IonicPage, MenuController, NavController } from "ionic-angular";
import { CredentialsDTO } from "../../models/credentials.dto";
import { AuthService } from "../../service/auth.service";
@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService
  ) {}

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

  ionViewDidEnter() {
    this.auth.refreshToken().subscribe(
      (response) => {
        this.auth.successfulLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot("CategoriesPage");
      },
      (error) => {}
    );
  }
  login() {
    this.auth.authenticate(this.credentials).subscribe(
      (response) => {
        this.auth.successfulLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot("CategoriesPage");
      },
      (error) => {}
    );
  }

  signup() {
    console.log("passou");
    this.navCtrl.push("SignupPage");
  }
}
