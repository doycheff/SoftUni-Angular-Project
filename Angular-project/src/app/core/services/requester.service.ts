import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RequesterService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  requester<T>(method: string, url: string, data?: any): Observable<T> {
    const accessToken = this.authService.accessToken;

    let headers = new HttpHeaders();
    if (accessToken) {
      headers = headers.set('X-Authorization', accessToken);
    }

    if (data) {
      headers = headers.set('Content-Type', 'application/json');
    }

    const options = {
      headers,
      body: data ? JSON.stringify(data) : null,
    };

    switch (method.toUpperCase()) {
      case 'GET':
        return this.http.get<T>(url, { headers });
      case 'POST':
        return this.http.post<T>(url, data, { headers });
      case 'PUT':
        return this.http.put<T>(url, data, { headers });
      case 'DELETE':
        return this.http.delete<T>(url, options);
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }
}
