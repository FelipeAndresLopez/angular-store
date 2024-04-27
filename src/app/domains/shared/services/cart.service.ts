import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<Product[]>([])
  total = computed(() => {
    const cart = this.cart()
    return cart.reduce((total, product) => total + product.price, 0)
  })

  constructor () { }

  addCart(product: Product) {
    this.cart.update((prevState) => {
      return [

        ...prevState,
        product
      ]

    })
  }

  removeProduct(productToRemove: Product) {
    this.cart.update((products) => {
      return products.filter((product) => product.id !== productToRemove.id)
    })
  }
}
