import { Component } from "@angular/core";
import { LoadingController } from "ionic-angular";
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
    public productService: ProductService,
    public loadingController: LoadingController
  ) {}

  ionViewDidLoad() {
    let category_id = this.navParams.get("category_id");
    let loader = this.presentLoading();
    this.productService.findByCategory(category_id).subscribe(
      (response) => {
        this.items = response["content"];
        this.loadImageUrl();
        loader.dismiss();
      },
      (error) => {
        loader.dismiss();
      }
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

  showDetail(product_id: string) {
    this.navCtrl.push("ProductDetailPage", { product_id: product_id });
  }

  presentLoading() {
    let loading = this.loadingController.create({
      content: "Aguarde...",
    });
    loading.present();
    return loading;
  }
}
