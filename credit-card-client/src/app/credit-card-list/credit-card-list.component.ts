import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router, private creditCardService: CreditCardService) {}

  ngOnInit() {
    this.loadCreditCards();
  }

  loadCreditCards() {
    this.creditCardService.getCreditCards().subscribe({
      next: (cards) => {
        this.creditCards = cards;
        this.filteredCards = cards; // Initially show all cards
      },
      error: (error) => {
        console.error('Error fetching credit cards:', error);
      }
    });
  }

  filterCards() {
    const lowerCaseFilter = this.filterText.toLowerCase();
    this.filteredCards = this.creditCards.filter(card =>
      card.cardholder_name.toLowerCase().includes(lowerCaseFilter)
    );
  }

  onCardClick(card_number: string) {
    this.router.navigate(['/credit-card-details', card_number]); 
  }
  
}
