import { Component, OnInit } from '@angular/core';
import { Book } from '../../types/book';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  book = {} as Book;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.apiService.getOneBook(id).subscribe((book) => {
      this.book = book;
    });
  }

  deleteHandler(id: string): void {
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
