import { Component } from '@angular/core';
import { Book } from '../types/book';
import { BooksListItemComponent } from "../book/books-list/books-list-item/books-list-item.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [BooksListItemComponent, CommonModule],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent {
    books: Book[] = [];

    constructor(private apiService: ApiService, private router: Router) { }

    search(event: SubmitEvent, search: string): void {
        event.preventDefault();

        this.apiService.searchBooks(search).subscribe(
            (books) => {
                this.books = books;
            });
    }

}
