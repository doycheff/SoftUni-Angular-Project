import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../../types/book';

@Component({
  selector: 'app-books-list-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './books-list-item.component.html',
  styleUrl: './books-list-item.component.css',
})
export class BooksListItemComponent {
  @Input() book!: Book;
}
