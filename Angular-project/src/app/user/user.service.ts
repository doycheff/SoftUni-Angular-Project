import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserForAuth } from '../types/user';

const BASE_URL = 'http://localhost:3030/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER_KEY = 'auth';
  user: UserForAuth | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = null;
    }
  }

  login(email: string, password: string): Observable<UserForAuth> {
    return this.http
      .post<UserForAuth>(`${BASE_URL}/login`, { email, password })
      .pipe(
        tap((user) => {
          this.user = user;
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        })
      );
  }

  register(email: string, password: string): Observable<UserForAuth> {
    return this.http
      .post<UserForAuth>(`${BASE_URL}/register`, { email, password })
      .pipe(
        tap((user) => {
          this.user = user;
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        })
      );
  }

  logout() {
    this.user = null;
    localStorage.removeItem(this.USER_KEY);
  }
}
