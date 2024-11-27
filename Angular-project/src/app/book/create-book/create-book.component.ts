import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css',
})
export class CreateBookComponent {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  addBook(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { title, genre, price, description, image } = form.value;

    this.apiService
      .createBook(title, genre, price, description, image)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error creating book:', err);
        },
      });
  }

  onCancel(event: Event) {
    event.preventDefault();

    this.router.navigate([`/books`]);
  }
}
