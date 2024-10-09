import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions`);
  }

  addTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/transactions`, transaction);
  }

  deleteTransaction(transactionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/transactions/${transactionId}`);
  }

  createCreditCard(cardData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cards`, cardData);
  }

  // Get all cards
  getCreditCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cards`);
  }

  // Delete a card using the card number
  deleteCreditCard(card_number: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cards/${card_number}`);
  }

  // Get a card by card number by filtering all cards
  getCardByNumber(card_number: string): Observable<any> {
    return this.getCreditCards().pipe(
      map(cards => cards.find(card => card.card_number === card_number))
    );
  }
}
