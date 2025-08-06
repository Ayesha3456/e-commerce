import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {
  cart: any[] = [];
  total: number = 0;
  date: string = '';

  ngOnInit() {
    const billData = localStorage.getItem('bill');
    if (billData) {
      const parsed = JSON.parse(billData);
      this.cart = parsed.cart;
      this.total = parsed.total;
      this.date = parsed.date;
    }
  }
}
