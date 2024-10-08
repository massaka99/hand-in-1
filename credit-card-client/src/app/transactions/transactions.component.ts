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
  
  // For adding a new transaction
  newTransaction = {
    credit_card: '',
    amount: 0,
    currency: '',
    comment: '',
    date: ''
  };
  
  isAddFormVisible = false; // Toggles the add form visibility
  isListVisible = true; // Toggles the transaction list visibility

  constructor(private creditCardService: CreditCardService) {}

  ngOnInit() {
    this.loadTransactions(); // Load transactions when the component initializes
  }

  // Load transactions from the backend
  loadTransactions() {
    this.creditCardService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.filteredTransactions = [...this.transactions]; // Optional: to allow filtering if needed
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  // Add a new transaction
  addTransaction() {
    this.creditCardService.addTransaction(this.newTransaction).subscribe({
      next: (response) => {
        this.transactions.push(response); // Add new transaction to the list
        this.filterTransactions(); // Refresh the filtered list
        this.isAddFormVisible = false; // Hide the form after adding
      },
      error: (error) => {
        console.error('Error adding transaction:', error);
      }
    });
  }

  // Remove a transaction
  removeTransaction(transaction: any) {
    this.creditCardService.deleteTransaction(transaction.id).subscribe({
      next: () => {
        this.transactions = this.transactions.filter(t => t.id !== transaction.id);
        this.filterTransactions();  // Apply filter after removal
      },
      error: (error) => {
        console.error('Error removing transaction:', error);
      }
    });
  }

  filterTransactions() {
    this.filteredTransactions = this.transactions.filter(t =>
      t.credit_card.number.includes(this.filterCardNumber) // Assuming 'number' is the correct field
    );
  }

  // Toggle the visibility of the transaction list
  toggleTransactionList() {
    this.isListVisible = !this.isListVisible;
  }

  // Toggle the add form visibility
  toggleAddForm() {
    this.isAddFormVisible = !this.isAddFormVisible;
  }
}
