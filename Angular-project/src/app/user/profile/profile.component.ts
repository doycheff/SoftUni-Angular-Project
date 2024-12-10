import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Book } from '../../types/book';
import { ApiService } from '../../core/services/api.service';
import { map } from 'rxjs';
import { ModalComponent } from '../../modal-dialog/modal-dialog.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  books: Book[] = [];
  userId: string | undefined;
  selectedBookId: string | null = null;

  isDeleteModalOpen = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userId = this.authService.userId;
  }

  ngOnInit() {
    if (this.userId) {
      this.apiService
        .getUserBooks(this.userId)
        .pipe(
          map((books) =>
            books.map((book) => ({ ...book, title: book.title.toUpperCase() }))
          )
        )
        .subscribe({
          next: (books: Book[]) => {
            this.books = books;
          },
        });
    }
  }

  showDeleteModal(bookId: string): void {
    this.selectedBookId = bookId;
    this.isDeleteModalOpen = true;
  }

  hideDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  deleteHandler(): void {
    if (this.selectedBookId) {
      this.apiService.deleteBook(this.selectedBookId).subscribe({
        next: () => {
          this.books = this.books.filter(
            (book) => book._id !== this.selectedBookId
          );
          this.hideDeleteModal();
        },
        error: (err) => {
          console.error('Error deleting book:', err);
        },
      });
    }
  }
}
