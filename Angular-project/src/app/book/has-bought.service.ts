import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HasBoughtService {
  constructor() {}

  updateHasBoughtStatus(bookId: string, status: boolean): Observable<void> {
    localStorage.setItem(`hasBought-${bookId}`, JSON.stringify(status));
    return of(undefined);
  }

  getHasBoughtStatus(bookId: string): boolean {
    const status = localStorage.getItem(`hasBought-${bookId}`);
    return status ? JSON.parse(status) : false;
  }
}
