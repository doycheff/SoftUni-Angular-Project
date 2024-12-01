import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'auth';

  private authState: {
    _id?: string;
    email?: string;
    accessToken?: string;
  } | null = null;

  constructor() {
    const storedAuth = localStorage.getItem(this.AUTH_KEY);
    this.authState = storedAuth ? JSON.parse(storedAuth) : null;
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
    return !!this.authState?.email;
  }

  changeAuthState(
    newAuthState: { userId: string; email: string; accessToken: string } | null
  ): void {
    this.authState = newAuthState;

    if (newAuthState) {
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(newAuthState));
    } else {
      localStorage.removeItem(this.AUTH_KEY);
    }
  }
}
