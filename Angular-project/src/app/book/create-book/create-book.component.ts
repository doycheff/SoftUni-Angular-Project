import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
    selector: 'app-create-book',
    standalone: true,
    imports: [],
    templateUrl: './create-book.component.html',
    styleUrl: './create-book.component.css'
})
export class CreateBookComponent {
    constructor(private apiService: ApiService) { };

    addBook(event: Event, title: string, genre: string, price: string, description: string, image: string) {
        event.preventDefault();

        this.apiService.createBook(title, genre, price, description, image).subscribe(data => {
            console.log(data);
        })
    }
}
