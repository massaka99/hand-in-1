import { Component, OnInit } from '@angular/core';
import { CreditCardService } from '../services/services/credit-card.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credit-card-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.css'],
})
export class CreditCardDetailsComponent implements OnInit {
  card_number!: string;
  creditCardDetails: any = {};
  transactions: any[] = [];
  showModal: boolean = false;

  constructor(
    private creditCardService: CreditCardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.card_number = this.route.snapshot.paramMap.get('card_number')!;
    await this.loadCardDetails();
    await this.loadTransactions();
    
    
  }

  async loadCardDetails() {
    this.creditCardService.getCreditCards().subscribe({
      next: (cards) => {
        const targetCardNumber = String(this.card_number);
        let foundCard: any = null;

        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          const cardNumberAsString = String(card.card_number);

          if (cardNumberAsString === targetCardNumber) {
            foundCard = card;
            break;
          }
        }

        if (foundCard) {
          this.creditCardDetails = foundCard;
          console.log('Fetched card details:', this.creditCardDetails);
          this.showModal = true;
          console.log('Show modal:', this.showModal);
        } else {
          console.error('Card not found');
        }
      },
      error: (error) => {
        console.error('Error fetching credit card details:', error);
      },
    });
  }

  async loadTransactions() {
    this.creditCardService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions.filter(t => t.credit_card === this.card_number);
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      },
    });
  }

  removeCard() {
    this.creditCardService.deleteCreditCard(this.card_number).subscribe({
      next: () => {
        alert('Card removed successfully.');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error removing credit card:', error);
      },
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
