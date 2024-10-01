import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { CreditcardlistComponent } from '../pages/creditcardlist/creditcardlist.component';
import { AddcreditComponent } from '../pages/addcredit/addcredit.component';
import { TransactionslistComponent } from '../pages/transactionslist/transactionslist.component';
import { TransactionsscreenComponent } from '../pages/transactionsscreen/transactionsscreen.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'creditcardlist', component: CreditcardlistComponent },
  { path: 'addcredit', component: AddcreditComponent },
  { path: 'transactionslist', component: TransactionslistComponent },
  { path: 'transactionsscreen', component: TransactionsscreenComponent },
];
