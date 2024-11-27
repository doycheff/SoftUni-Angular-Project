import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../../types/book';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3030/data/books';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const authJSON = localStorage.getItem('auth');
    const accessToken = authJSON ? JSON.parse(authJSON)?.accessToken : '';

    let headers = new HttpHeaders();
    if (accessToken) {
      headers = headers.set('X-Authorization', accessToken);
    }

    return headers;
  }

  getBooks() {
    return this.http.get<Book[]>(`${BASE_URL}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getOneBook(id: string) {
    return this.http.get<Book>(`${BASE_URL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getLatestBooks() {
    return this.http.get<Book[]>(
      `${BASE_URL}?sortBy=_createdOn%20desc&offset=0&pageSize=3`
    );
  }

  searchBooks(query: string) {
    return this.http.get<Book[]>(
      `${BASE_URL}?where=title%20LIKE%20%22${query}%22`
    );
  }

  createBook(
    title: string,
    genre: string,
    price: string,
    description: string,
    image: string
  ) {
    const payload = { title, genre, price, description, image };
    return this.http.post<Book>(`${BASE_URL}`, payload, {
      headers: this.getAuthHeaders(),
    });
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${BASE_URL}/${id}`, book, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteBook(id: string) {
    return this.http.delete<void>(`${BASE_URL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
