import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-book',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './edit-book.component.html',
    styleUrl: './edit-book.component.css'
})
export class EditBookComponent {
    constructor(private route: ActivatedRoute, private router: Router){}

    editBook(form: NgForm) {

    }

    onCancel(event: Event) {
        event.preventDefault();

        const id = this.route.snapshot.params['id']
        this.router.navigate([`/books/${id}`]);


    }
}
