import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreditcardlistComponent } from './credit-card-list/credit-card-list.component';
import { AddcreditcardComponent } from './add-credit-card/add-credit-card.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionsComponent } from './transactions/transactions.component';


export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'credit-card-list', component: CreditcardlistComponent },
  { path: 'add-credit-card', component: AddcreditcardComponent },
  { path: 'transaction-list', component: TransactionListComponent },
  { path: 'transactions', component: TransactionsComponent },
 
];

