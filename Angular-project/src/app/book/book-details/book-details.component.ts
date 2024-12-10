import { Component, OnInit } from '@angular/core';
import { Book } from '../../types/book';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { BuyerEmailService } from '../buyer-email.service';
import { HasBoughtService } from '../has-bought.service';
import { NgIf } from '@angular/common';
import { EmailNamePipe } from '../../core/pipes/email-name.pipe';
import { ModalComponent } from '../../modal-dialog/modal-dialog.component';
import { map } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, NgIf, EmailNamePipe, ModalComponent],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  book = {} as Book;
  isOwner: boolean = false;
  buyerEmail: string = '';
  hasBought: boolean = false;
  isAuthenticated: boolean = false;

  isDeleteModalOpen = false;
  isBuyModalOpen = false;
  isSuccessModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private buyerEmailService: BuyerEmailService,
    private hasBoughtService: HasBoughtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.apiService
      .getOneBook(id)
      .pipe(map((book) => ({ ...book, title: book.title.toUpperCase() })))
      .subscribe((book) => {
        this.book = book;

        this.authService.userObservable.subscribe((user) => {
          this.isAuthenticated = !!user;

          if (user) {
            const currentUserId = user._id;
            this.isOwner = book._ownerId === currentUserId;
          } else {
          }

          this.buyerEmail = this.buyerEmailService.getBuyerEmail(id) ?? '';
          this.hasBought = this.hasBoughtService.getHasBoughtStatus(id);
        });
      });
  }

  showDeleteModal(): void {
    this.isDeleteModalOpen = true;
  }

  hideDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  showBuyModal(): void {
    this.isBuyModalOpen = true;
  }

  hideBuyModal(): void {
    this.isBuyModalOpen = false;
  }

  showSuccessModal(): void {
    this.isSuccessModalOpen = true;
  }

  hideSuccessModal(): void {
    this.isSuccessModalOpen = false;
    this.router.navigate(['/books']);
  }

  buyBook(): void {
    const email = this.authService.email ?? '';
    const bookId = this.book._id;

    this.buyerEmailService.updateBuyerEmail(bookId, email).subscribe({
      next: () => {
        this.hasBoughtService.updateHasBoughtStatus(bookId, true).subscribe({
          next: () => {
            this.buyerEmail = email;
            this.hasBought = true;
            this.isBuyModalOpen = false;
          },
          error: (error) => console.error(error),
        });
      },
      error: (error) => console.error(error),
    });
  }

  deleteHandler(id: string): void {
    this.apiService.deleteBook(id).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
    });
  }
}
