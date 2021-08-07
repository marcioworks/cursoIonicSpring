import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AddressDTO } from "../../models/address.dto";
import { ClientService } from "../../service/domain/client.service";
import { StorageService } from "../../service/storage.service";

@IonicPage()
@Component({
  selector: "page-address-pick",
  templateUrl: "address-pick.html",
})
export class AddressPickPage {
  items: AddressDTO[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService
  ) {}

  ionViewDidLoad() {
    let user = this.storage.getLocalStorageUser();
    console.log(user);
    if (user && user.email) {
      this.clientService.findByEmail(user.email).subscribe(
        (response) => {
          console.log(response);
          this.items = response["addresses"];
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
}
