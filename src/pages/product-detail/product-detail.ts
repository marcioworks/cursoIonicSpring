import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { API_CONFIG } from "../../config/api.config";
import { ProductDTO } from "../../models/product.dto";
import { CartService } from "../../service/domain/cart.service";
import { ProductService } from "../../service/domain/product.service";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-product-detail",
  templateUrl: "product-detail.html",
})
export class ProductDetailPage {
  item: ProductDTO;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public cartService: CartService
  ) {}

  ionViewDidLoad() {
    let product_id = this.navParams.get("product_id");
    this.productService.findById(product_id).subscribe((response) => {
      this.item = response;
      this.getImageIfExists();
    });
  }

  getImageIfExists() {
    this.productService.getImageFromBucket(this.item.id).subscribe(
      (response) => {
        this.item.imageUrl = `${API_CONFIG.baseBucketUrl}/prod${this.item.id}.jpg`;
      },
      (error) => {}
    );
  }

  addToCart(product: ProductDTO) {
    this.cartService.addProduct(product);
    this.navCtrl.push("CartPage");
  }
}
