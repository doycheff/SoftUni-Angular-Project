import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Book } from '../../types/book';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  books: Book[] = [];
  userId: string | undefined;

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

  deleteHandler(id: string) {
    this.apiService.deleteBook(id).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: (err) => {
        console.error('Error deleting book:', err);
      },
    });
  }
}
