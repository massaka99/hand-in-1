import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreditCardService } from '../services/services/credit-card.service';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-addcredit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule], 
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.css'],
  providers: [CreditCardService]  
})
export class AddcreditcardComponent implements OnInit {

  addCreditForm!: FormGroup;  

  submissionSuccess: boolean = false;
  submissionError: boolean = false;

  constructor(private fb: FormBuilder, private CreditCardService: CreditCardService) {}

  ngOnInit(): void {
    this.addCreditForm = this.fb.group({
      card_number: [
        '',
        [
          Validators.required, 
          Validators.minLength(7), 
          Validators.maxLength(16), 
          Validators.pattern('^[0-9]*$')
        ]
      ],
      csc_code: [
        '', 
        [
          Validators.required, 
          Validators.pattern('^[0-9]{3}$')
        ]
      ],
      cardholder_name: [
        '', 
        Validators.required
      ],
      expiration_date_month: [
        '', 
        [
          Validators.required, 
          Validators.min(1), 
          Validators.max(12)
        ]
      ],
      expiration_date_year: [
        '', 
        Validators.required
      ],
      issuer: [
        '', 
        Validators.required
      ]
    });
  }

  onSubmit() {
    if (this.addCreditForm.valid) {
      const cardData = this.addCreditForm.value;

      // Post the form data to the server using the CreditCardService
      this.CreditCardService.createCreditCard(cardData).subscribe({
        next: (response) => {
          console.log('Credit Card added successfully:', response);
          this.addCreditForm.reset();
          this.submissionSuccess = true;  // Show success message
          this.submissionError = false;   // Hide error message
        },
        error: (error) => {
          console.error('Error adding Credit Card:', error);
          this.submissionError = true;   // Show error message
          this.submissionSuccess = false; // Hide success message
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}