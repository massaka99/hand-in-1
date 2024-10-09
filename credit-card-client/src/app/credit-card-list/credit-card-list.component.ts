import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-creditcardlist',
  templateUrl: './credit-card-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./credit-card-list.component.css']
})
export class CreditcardlistComponent {
  creditCards = [
    {
      card_number: '1234 5678 9012 3456',
      cardholder_name: 'John Doe',
      issuer: 'Bank Jylland'
    },
    {
      card_number: '9876 5432 1098 7654',
      cardholder_name: 'Jane Smith',
      issuer: 'Danske Bank'
    },
    {
      card_number: '3128 3821 8291 1892',
      cardholder_name: 'Sanad Doe',
      issuer: 'Nordea'
    }
  ];

  filterText: string = '';

  constructor(private router: Router) {}

  filterCards() {
    
  }

  viewDetails(card_number: string) {
    this.router.navigate(['/creditcarddetails', card_number]);
  }

  onCardClick(card_number: string) {
    this.router.navigate(['/creditcarddetails', card_number]);
  }
}
