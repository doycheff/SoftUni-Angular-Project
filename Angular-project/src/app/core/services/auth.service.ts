import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserForAuth } from '../../types/user';

const BASE_URL = 'http://localhost:3030/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'auth';

  private authState: UserForAuth | null = null;
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  constructor(private http: HttpClient) {
    const storedAuth = localStorage.getItem(this.AUTH_KEY);
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth) as UserForAuth;
        this.authState = parsedAuth;
        this.user$$.next(parsedAuth);
      } catch {
        this.authState = null;
      }
    }
  }

  get userId(): string | undefined {
    return this.authState?._id;
  }

  get email(): string | undefined {
    return this.authState?.email;
  }

  get accessToken(): string | undefined {
    return this.authState?.accessToken;
  }

  get isAuthenticated(): boolean {
    return !!this.authState?.accessToken;
  }

  get userObservable() {
    return this.user$;
  }

  changeAuthState(newAuthState: UserForAuth | null): void {
    this.authState = newAuthState;

    if (newAuthState) {
      const { password, ...stateToStore } = newAuthState;
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(stateToStore));
      this.user$$.next(newAuthState);
    } else {
      localStorage.removeItem(this.AUTH_KEY);
      this.user$$.next(null);
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>(`${BASE_URL}/login`, { email, password })
      .pipe(
        tap((user) => {
          this.changeAuthState(user);
        })
      );
  }

  register(email: string, password: string) {
    return this.http
      .post<UserForAuth>(`${BASE_URL}/register`, { email, password })
      .pipe(
        tap((user) => {
          this.changeAuthState(user);
        })
      );
  }

  logout(): void {
    this.changeAuthState(null);
  }
}
