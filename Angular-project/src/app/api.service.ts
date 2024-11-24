import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Book } from './types/book';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    getBooks() {
        const { apiUrl } = environment;
        return this.http.get<Book[]>(`${apiUrl}/books`);
    }

    getLatestBooks() {
        const { apiUrl } = environment;
        return this.http.get<Book[]>(`${apiUrl}/books?sortBy=_createdOn%20desc&offset=0&pageSize=3`)
    }

    searchBooks(query: string) {
        const { apiUrl } = environment;
        return this.http.get<Book[]>(`${apiUrl}/books?where=title%20LIKE%20%22${query}%22`)
    }

    getOneBook(id: string) {
        const { apiUrl } = environment;
        return this.http.get<Book>(`${apiUrl}/books/${id}`);
    }

    createBook(title: string, genre: string, price: string, description: string, image: string) {
        const { apiUrl } = environment;
        const payload = { title, genre, price, description, image };
        return this.http.post<Book>(`${apiUrl}/books`, payload);
    }

}