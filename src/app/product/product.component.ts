import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../product.model';
import { PRODUCTS } from '../mock-products';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  searchText = '';
  sortOption = '';
  cart: Product[] = [];
  products: Product[] = PRODUCTS;

  constructor() {
    const stored = localStorage.getItem('cart');
    if (stored) this.cart = JSON.parse(stored);
  }

  filteredProducts(): Product[] {
    let filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );

    switch (this.sortOption) {
      case 'az': return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'za': return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case 'low': return filtered.sort((a, b) => a.price - b.price);
      case 'high': return filtered.sort((a, b) => b.price - a.price);
      default: return filtered;
    }
  }

  addToCart(product: Product) {
    const existing = this.cart.find(p => p.id === product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.cart.push({ ...product });
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeFromCart(item: Product) {
    this.cart = this.cart.filter(p => p.id !== item.id);
    this.saveCart();
  }

  totalItems(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  totalPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
