import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addcredit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './addcredit.component.html',
  styleUrls: ['./addcredit.component.css']
})
export class AddcreditComponent implements OnInit {

  addCreditForm!: FormGroup;  

  constructor(private fb: FormBuilder) {}

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
      csc_code: 
      [
        '', 
        [
          Validators.required, 
          Validators.pattern('^[0-9]{3}$')
        ]
      ],
      cardholder_name: 
      [
        '', 
        Validators.required
      ],
      expiration_date_month: 
      [
        '', 
        Validators.required, 
        Validators.min(1), 
        Validators.max(12)
      ],
      expiration_date_year: 
      [
        '', 
        Validators.required
      ],
      issuer: 
      ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addCreditForm.valid) {
      console.log('Form Submitted', this.addCreditForm.value);  
    } else {
      console.log('Form is invalid');  
    }
  }
}