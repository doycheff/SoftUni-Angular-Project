import { Component } from '@angular/core';
import { Book } from '../types/book';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  latestBooks: Book[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getLatestBooks().subscribe((books) => {
      this.latestBooks = books;
    });
  }
}
