import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CategoryDto } from "../../models/category.dto";
import { CategoryService } from "../../service/domain/category.service";
import { API_CONFIG } from "../../config/api.config";
@IonicPage()
@Component({
  selector: "page-categories",
  templateUrl: "categories.html",
})
export class CategoriesPage {
  items: CategoryDto[];
  bucketUrl: string = API_CONFIG.baseBucketUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryService: CategoryService
  ) {}

  ionViewDidLoad() {
    this.categoryService.findAll().subscribe(
      (response) => {
        this.items = response;
        console.log(response);
      },
      (error) => {}
    );
  }

  showProducts() {
    this.navCtrl.push("ProductPage");
  }
}
