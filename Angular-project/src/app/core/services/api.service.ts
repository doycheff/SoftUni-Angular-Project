import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Book } from '../../types/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly BASE_URL = 'http://localhost:3030/data/books';

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
    return this.http.get<Book[]>(`${this.BASE_URL}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getOneBook(id: string) {
    return this.http.get<Book>(`${this.BASE_URL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getLatestBooks() {
    return this.http.get<Book[]>(
      `${this.BASE_URL}?sortBy=_createdOn%20desc&offset=0&pageSize=3`
    );
  }

  getUserBooks(_ownerId: string): Observable<Book[]> {
    const whereClause = `_ownerId%3D%22${_ownerId}%22`;
    const url = `${this.BASE_URL}?where=${whereClause}`;

    return this.http.get<Book[]>(url);
  }

  searchBooks(query: string) {
    return this.http.get<Book[]>(
      `${this.BASE_URL}?where=title%20LIKE%20%22${query}%22`
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
    return this.http.post<Book>(`${this.BASE_URL}`, payload, {
      headers: this.getAuthHeaders(),
    });
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.BASE_URL}/${id}`, book, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteBook(id: string) {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
