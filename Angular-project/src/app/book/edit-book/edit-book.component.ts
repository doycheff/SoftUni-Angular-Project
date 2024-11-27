import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../types/book';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent implements OnInit {
  book = {} as Book;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.apiService.getOneBook(id).subscribe((book) => {
      this.book = book;
    });
  }

  editBook(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const id = this.route.snapshot.params['id'];

    this.apiService.updateBook(id, this.book).subscribe(() => {
      this.router.navigate([`/books/${id}`]);
    });
  }

  onCancel(event: Event) {
    event.preventDefault();

    const id = this.route.snapshot.params['id'];
    this.router.navigate([`/books/${id}`]);
  }
}
