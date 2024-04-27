import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/model/product.model';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/model/category.model';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, CommonModule, HeaderComponent, UpperCasePipe, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([])
  private cartService = inject(CartService)
  private productService = inject(ProductService)
  private categoryService = inject(CategoryService)
  @Input() category_id?: string

  private getProducts() {
    this.productService.getProducts(this.category_id!)
      .subscribe({
        next: (products) => {
          this.products.set(products)
        },
        error: () => {
          console.log('error getting products');

        }
      })
  }

  private getCategories() {
    this.categoryService.getCategories()
      .subscribe({
        next: (categories) => {
          this.categories.set(categories)
        },
        error: () => {
          console.log('Error getting categories');
        }
      })
  }


  ngOnInit() {
    this.getCategories()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getProducts()
  }

  addToCart(product: Product) {
    this.cartService.addCart(product)
  }
}
