import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { BillingComponent } from './billing/billing.component';
import { BillComponent } from './bill/bill.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'product', component: ProductComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'final-bill', component: BillComponent }
];
