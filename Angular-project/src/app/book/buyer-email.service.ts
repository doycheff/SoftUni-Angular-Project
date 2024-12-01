import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BuyerEmailService {
  constructor() {}

  // Update the buyer email for a specific book
  updateBuyerEmail(bookId: string, email: string): void {
    localStorage.setItem(`buyerEmail-${bookId}`, email);
  }

  // Retrieve the buyer email for a specific book
  getBuyerEmail(bookId: string): string | null {
    return localStorage.getItem(`buyerEmail-${bookId}`); // Always returns a string or null
  }
}
