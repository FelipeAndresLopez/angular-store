import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { Product } from '@shared/model/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  @Input() id?: string
  product = signal<Product | null>(null)
  cover = signal<string | null>(null)
  private productService = inject(ProductService)
  private cartService = inject(CartService)

  ngOnInit() {
    if (this.id) {
      this.productService.getProduct(this.id)
        .subscribe({
          next: (product) => {
            this.product.set(product)
            if (product.images.length > 0) {
              this.cover.set(product.images[0])

            }
          },
          error: () => {
            console.log('error getting product');
          }
        })
    }
  }

  setCover(image: string) {
    this.cover.set(image)
  }

  addToCart() {
    this.cartService.addCart(this.product()!)
  }
}
