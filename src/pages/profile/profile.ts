import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { API_CONFIG } from "../../config/api.config";
import { ClientDTO } from "../../models/client.dto";
import { ClientService } from "../../service/domain/client.service";
import { StorageService } from "../../service/storage.service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {
  client: ClientDTO;

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
          this.client = response;
          this.getImageIfExists();
        },
        (error) => {}
      );
    }
    console.log("ionViewDidLoad ProfilePage");
  }

  getImageIfExists() {
    this.clientService.getImageFromBucket(this.client.id).subscribe(
      (response) => {
        this.client.imageUrl = `${API_CONFIG.baseBucketUrl}/cp${this.client.id}.jpg`;
      },
      (error) => {}
    );
  }
}
