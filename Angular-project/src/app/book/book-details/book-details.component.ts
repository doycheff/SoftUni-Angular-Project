import { Component, OnInit } from '@angular/core';
import { Book } from '../../types/book';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { BuyerEmailService } from '../buyer-email.service';
import { HasBoughtService } from '../has-bought.service';
import { NgIf } from '@angular/common';
import { EmailNamePipe } from '../../core/pipes/email-name.pipe';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, NgIf, EmailNamePipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  book = {} as Book;
  isOwner: boolean = false;
  buyerEmail: string = '';
  hasBought: boolean = false;
  isAuthenticated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private buyerEmailService: BuyerEmailService,
    private hasBoughtService: HasBoughtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated; 
    
    const id = this.route.snapshot.params['id'];

    this.apiService.getOneBook(id).subscribe((book) => {
      this.book = book;

      const currentUserId = this.authService.userId;
      this.isOwner = book._ownerId === currentUserId;

      const email = this.buyerEmailService.getBuyerEmail(id);
      this.buyerEmail = email ?? '';
      this.hasBought = this.hasBoughtService.getHasBoughtStatus(id);
    });
  }

  async buyBook(): Promise<void> {
    try {
      const email = this.authService.email ?? '';
      const bookId = this.book._id;

      this.buyerEmailService.updateBuyerEmail(bookId, email);
      this.hasBoughtService.updateHasBoughtStatus(bookId, true);

      this.buyerEmail = email;
      this.hasBought = true;
    } catch (error) {
      console.error(error);
    }
  }

  deleteHandler(id: string): void {
    this.apiService.deleteBook(id).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      }
    });
  }
}
