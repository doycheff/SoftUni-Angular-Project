import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserForAuth } from '../types/user';

const BASE_URL = 'http://localhost:3030/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  USER_KEY = 'auth';
  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    const lsUser = localStorage.getItem(this.USER_KEY);
    if (lsUser) {
      try {
        const parsedUser = JSON.parse(lsUser);
        this.user$$.next(parsedUser);
      } catch {
        this.user = null;
      }
    }

    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>(`${BASE_URL}/login`, { email, password })
      .pipe(
        tap({
          next: (user) => {
            this.user$$.next(user);
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          },
        })
      );
  }

  register(email: string, password: string) {
    return this.http
      .post<UserForAuth>(`${BASE_URL}/register`, { email, password })
      .pipe(
        tap({
          next: (user) => {
            this.user$$.next(user);
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          },
        })
      );
  }

  logout() {
    this.user$$.next(null);
    localStorage.removeItem(this.USER_KEY);
  }
}
