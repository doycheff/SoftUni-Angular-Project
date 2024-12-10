import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuyerEmailService {
  constructor() {}

  updateBuyerEmail(bookId: string, email: string): Observable<void> {
    localStorage.setItem(`buyerEmail-${bookId}`, email);
    return of(undefined);
  }

  getBuyerEmail(bookId: string): string | null {
    return localStorage.getItem(`buyerEmail-${bookId}`);
  }
}
