import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { API_CONFIG } from "../../config/api.config";
import { ProductDTO } from "../../models/product.dto";
import { ProductService } from "../../service/domain/product.service";

@IonicPage()
@Component({
  selector: "page-product",
  templateUrl: "product.html",
})
export class ProductPage {
  items: ProductDTO[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService
  ) {}

  ionViewDidLoad() {
    let category_id = this.navParams.get("category_id");
    this.productService.findByCategory(category_id).subscribe(
      (response) => {
        this.items = response["content"];
        this.loadImageUrl();
      },
      (error) => {}
    );
  }

  loadImageUrl() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.id).subscribe(
        (response) => {
          item.imageUrl = `${API_CONFIG.baseBucketUrl}/prod${item.id}-small.jpg`;
        },
        (error) => {}
      );
    }
  }
}
