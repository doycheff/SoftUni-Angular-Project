import { Component, OnInit } from '@angular/core';
import { Book } from '../../types/book';
import { BooksListItemComponent } from "./books-list-item/books-list-item.component";
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [BooksListItemComponent],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent implements OnInit{
    books: Book[] = [];
  
    constructor(private apiService: ApiService) {}
  
    ngOnInit() {
      this.apiService.getBooks().subscribe((books) => {
        this.books = books;
      });
    }
  
}
