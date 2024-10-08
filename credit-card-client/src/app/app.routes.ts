import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreditcardlistComponent } from './creditcardlist/creditcardlist.component';
import { AddcreditComponent } from './addcredit/addcredit.component';
import { TransactionslistComponent } from './transactionslist/transactionslist.component';
import { TransactionsscreenComponent } from './transactionsscreen/transactionsscreen.component';
import { CreditcarddetailsscreenComponent } from './creditcarddetailsscreen/creditcarddetailsscreen.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'creditcardlist', component: CreditcardlistComponent },
  { path: 'addcredit', component: AddcreditComponent },
  { path: 'transactionslist', component: TransactionslistComponent },
  { path: 'transactionsscreen', component: TransactionsscreenComponent },
  { path: 'creditcarddetails', component: CreditcarddetailsscreenComponent }
];

