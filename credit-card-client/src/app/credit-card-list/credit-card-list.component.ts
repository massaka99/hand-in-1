import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditCardService } from '../services/services/credit-card.service';

@Component({
  selector: 'app-creditcardlist',
  templateUrl: './credit-card-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./credit-card-list.component.css'],
})
export class CreditcardlistComponent implements OnInit {
  creditCards: any[] = []; // Cards fetched from backend
  filteredCards: any[] = []; // Cards after filtering
  filterText: string = '';
  showModal: boolean = false; // Modal state
  creditCardDetails: any = {}; // Credit card details for modal
  transactions: any[] = []; // All transactions
  filteredTransactions: any[] = []; // Transactions after filtering by card
  filterCardNumber: string = ''; // Filter for transactions

  constructor(
    private router: Router,
    private creditCardService: CreditCardService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCreditCards();
    this.loadTransactions(); // Load all transactions
  }

  loadCreditCards() {
    this.creditCardService.getCreditCards().subscribe({
      next: (cards) => {
        this.creditCards = cards;
        this.filteredCards = [...this.creditCards];
      },
      error: (error) => {
        console.error('Error fetching credit cards:', error);
      }
    });
  }

  // Fetch transactions associated with a specific card number
  loadTransactionsForCard(card_number: string) {
    this.filteredTransactions = this.transactions.filter(
      (t) => t.credit_card && t.credit_card.number === card_number
    );
    console.log('Transactions for card:', this.filteredTransactions);
  }

  // Accept card number as argument
  GetSpecificCard(card_number: string) {
    this.creditCardService.getCreditCards().subscribe({
      next: (cards) => {
        const targetCardNumber = String(card_number);
        const foundCard = cards.find((card) => String(card.card_number) === targetCardNumber);
  
        if (foundCard) {
          this.creditCardDetails = foundCard;
          console.log('Fetched card details:', this.creditCardDetails);

          // After fetching card details, load transactions for that card
          this.filterTransactions(card_number);

          this.showModal = true;
          this.cdr.detectChanges(); // Manually trigger change detection
          console.log('Show modal:', this.showModal);
        } else {
          console.error('Card not found');
        }
      },
      error: (error) => {
        console.error('Error fetching credit card details:', error);
      }
    });
  }

  // Load all transactions from the backend
  loadTransactions() {
    this.creditCardService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        console.log('All transactions:', this.transactions);
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

// Filter transactions by card number
filterTransactions(targetCardNumber: string) {
  const targetNumber = String(targetCardNumber);

  this.filteredTransactions = this.transactions.filter(
    (transaction) => transaction.credit_card && String(transaction.credit_card.number) === targetNumber
  );

  console.log('fil trans',this.filteredTransactions);
  console.log('target', targetCardNumber); 
}

  

  filterCards() {
    const lowerCaseFilter = this.filterText.toLowerCase();
    this.filteredCards = this.creditCards.filter((card) =>
      card.cardholder_name.toLowerCase().includes(lowerCaseFilter)
    );
  }

  onCardClick(card_number: string) {
    this.GetSpecificCard(card_number);
    this.loadTransactionsForCard(card_number);
  }

  closeModal() {
    this.showModal = false; // Hide modal on close
    this.cdr.detectChanges(); // Manually trigger change detection after closing
  }

  DeleteCreditCard(card_number: string) {
    this.creditCardService.deleteCreditCard(card_number).subscribe({
      next: () => {
        console.log('Card removed:', card_number);
        // Reload cards after removing the card
        this.loadCreditCards();
      },
      error: (error) => {
        console.error('Error removing card:', error);
      }
    });
  }

  removeCard() {
    if (!this.creditCardDetails || !this.creditCardDetails.card_number) {
      console.error('No card selected for removal');
      return;
    }

    const cardNumber = this.creditCardDetails.card_number;

    // Call the delete method and handle the list reloading once it's successful
    this.creditCardService.deleteCreditCard(cardNumber).subscribe({
      next: () => {
        console.log('Card removed:', cardNumber);

        // Reload the list of cards after the card is successfully deleted
        this.loadCreditCards();

        // Close the modal after successful deletion
        this.closeModal();
      },
      error: (error) => {
        console.error('Error removing card:', error);
      }
    });
  }
}
