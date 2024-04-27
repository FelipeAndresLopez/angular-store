import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private cartService = inject(CartService)
  total = this.cartService.total
  cart = this.cartService.cart

  hideSideMenu = signal(true);

  toggleSideMenu() {
    this.hideSideMenu.update((prevState) => !prevState);
  }

  removeFromCart(product: Product) {
    this.cartService.removeProduct(product)
  }
}
