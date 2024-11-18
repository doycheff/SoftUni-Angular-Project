import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent {

}
