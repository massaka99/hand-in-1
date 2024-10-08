import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactionsscreen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
  transactions = [
    { credit_card: '1234567', amount: 50, currency: 'USD', comment: 'Lunch', date: new Date() },
    { credit_card: '7654321', amount: 100, currency: 'EUR', comment: 'Office Supplies', date: new Date() },
  ];

  filteredTransactions = [...this.transactions];
  filterCardNumber = '';

  // Add 
  addTransaction() {
    alert('Add transaction functionality to be implemented');
  }

  // Remove 
  removeTransaction(transaction: any) {
    alert(`Remove transaction with card ${transaction.credit_card}`);
  }

  // Filter 
  filterTransactions() {
    this.filteredTransactions = this.transactions.filter(t =>
      t.credit_card.includes(this.filterCardNumber)
    );
  }
}