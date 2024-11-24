import { Component, OnInit } from '@angular/core';
import { Book } from '../../types/book';
import { ApiService } from '../../api.service';
import { BooksListItemComponent } from "./books-list-item/books-list-item.component";

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
