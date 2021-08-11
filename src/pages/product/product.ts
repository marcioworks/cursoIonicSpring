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
  items: ProductDTO[] = [];
  page: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public loadingController: LoadingController
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }
  loadData() {
    let category_id = this.navParams.get("category_id");
    let loader = this.presentLoading();
    this.productService.findByCategory(category_id, this.page, 10).subscribe(
      (response) => {
        console.log(response);
        let start = this.items.length;
        this.items = this.items.concat(response["content"]);
        let end = this.items.length - 1;
        loader.dismiss();
        this.loadImageUrl(start, end);
        console.log(this.page);
        console.log(this.items);
      },
      (error) => {
        loader.dismiss();
      }
    );
  }
  loadImageUrl(start, end) {
    for (var i = start; i <= end; i++) {
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
  doRefresh(event) {
    this.page = 0;
    this.items = [];
    this.loadData();

    setTimeout(() => {
      event.complete();
    }, 1000);
  }

  doInfinity(event) {
    this.page++;
    console.log("page: ", this.page);
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }
}
