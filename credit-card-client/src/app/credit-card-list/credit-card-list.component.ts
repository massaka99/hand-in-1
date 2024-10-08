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

  // Declare the filterText property
  filterText: string = '';

  constructor(private router: Router) {}

  // Implement the filterCards method (if you need to perform additional filtering logic)
  filterCards() {
    // You can implement custom filtering logic if needed
    // Currently, the ngFor will handle filtering via the pipe (if implemented)
  }

  // Implement the viewDetails method
  viewDetails(card_number: string) {
    this.router.navigate(['/creditcarddetails', card_number]);
  }

  onCardClick(card_number: string) {
    this.router.navigate(['/creditcarddetails', card_number]);
  }
}
