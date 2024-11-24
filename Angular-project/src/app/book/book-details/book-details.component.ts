import { Component, OnInit } from '@angular/core';
import { Book } from '../../types/book';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-book-details',
    standalone: true,
    imports: [],
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
    book = {} as Book;

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id']
        
        this.apiService.getOneBook(id).subscribe(book => {
            this.book = book
        })
        
    }
}
