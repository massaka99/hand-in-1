import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
