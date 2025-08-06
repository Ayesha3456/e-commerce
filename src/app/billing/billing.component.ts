import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent {
  cart: any[] = [];
  total: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.total = this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
  }

  confirmPurchase() {
    const billData = {
      cart: this.cart,
      total: this.total,
      date: new Date().toLocaleString()
    };
    localStorage.setItem('bill', JSON.stringify(billData));
    this.router.navigate(['/final-bill']);
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cart = [];
    this.total = 0;
  }
}
