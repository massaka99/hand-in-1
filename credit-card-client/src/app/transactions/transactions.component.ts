import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionListComponent } from '../transaction-list/transaction-list.component'; 
import { CreditCardService } from '../services/services/credit-card.service';

@Component({
  selector: 'app-transactionsscreen',
  standalone: true,
  imports: [CommonModule, FormsModule, TransactionListComponent],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  filterCardNumber = '';
  
  newTransaction = {
    credit_card: '',
    amount: 0,
    currency: '',
    comment: '',
    date: ''
  };
  
  isAddFormVisible = false; 
  isListVisible = true; 

  constructor(private creditCardService: CreditCardService) {}

  ngOnInit() {
    this.loadTransactions(); 
  }

  loadTransactions() {
    this.creditCardService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.filteredTransactions = [...this.transactions]; 
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  addTransaction() {
    this.creditCardService.addTransaction(this.newTransaction).subscribe({
      next: (response) => {
        this.transactions.push(response); 
        this.filterTransactions(); 
        this.isAddFormVisible = false; 
      },
      error: (error) => {
        console.error('Error adding transaction:', error);
      }
    });
  }

  removeTransaction(transaction: any) {
    this.creditCardService.deleteTransaction(transaction.id).subscribe({
      next: () => {
        this.transactions = this.transactions.filter(t => t.id !== transaction.id);
        this.filterTransactions();  
      },
      error: (error) => {
        console.error('Error removing transaction:', error);
      }
    });
  }

  filterTransactions() {
    this.filteredTransactions = this.transactions.filter(t =>
      t.credit_card.number.includes(this.filterCardNumber)
    );
  }

  toggleTransactionList() {
    this.isListVisible = !this.isListVisible;
  }

  toggleAddForm() {
    this.isAddFormVisible = !this.isAddFormVisible;
  }
}
