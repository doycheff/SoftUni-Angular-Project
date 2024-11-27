import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getAccessToken(): string {
    const authJSON = localStorage.getItem('auth');

    if (!authJSON) {
      return '';
    }

    const authData = JSON.parse(authJSON);
    return authData?.accessToken || '';
  }
}
