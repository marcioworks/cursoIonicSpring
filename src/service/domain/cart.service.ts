import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProductDTO } from "../../models/product.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService {
  constructor(public storage: StorageService) {}

  createOrClearCart(): Cart {
    let cart: Cart = { items: [] };
    this.storage.setLocalStorageCart(cart);
    return cart;
  }

  getCart(): Cart {
    let cart: Cart = this.storage.getLocalStorageCart();
    if (cart == null) {
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduct(product: ProductDTO): Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex((x) => x.product.id == product.id);
    if (position == -1) {
      cart.items.push({ quantity: 1, product: product });
    }
    this.storage.setLocalStorageCart(cart);
    return cart;
  }
}
