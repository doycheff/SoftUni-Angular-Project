import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HasBoughtService {
  constructor() {}

  // Store the purchase status in localStorage
  updateHasBoughtStatus(bookId: string, status: boolean): void {
    localStorage.setItem(`hasBought-${bookId}`, JSON.stringify(status));
  }

  // Retrieve the purchase status from localStorage
  getHasBoughtStatus(bookId: string): boolean {
    const status = localStorage.getItem(`hasBought-${bookId}`);
    return status ? JSON.parse(status) : false;
  }
}
