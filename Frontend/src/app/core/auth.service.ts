import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}`;
  private token = signal<string | null>(sessionStorage.getItem('token'));

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<{ token: string, message: string }> {
    return this.http.post<{ token: string, message: string }>(`${environment.apiBaseUrl}/auth/login`, { email, password });
  }

  register(email: string, password: string): Observable<{ token: string, message: string }> {
    return this.http.post<{ token: string, message: string }>(`${environment.apiBaseUrl}/auth/register`, { email, password });
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  setToken(value: string) {
    sessionStorage.setItem('token', value);
    this.token.set(value);
  }

  getToken() {
    return this.token();
  }

  isLoggedIn = computed(() => !!this.token());

  logout() {
    sessionStorage.removeItem('token');
    this.token.set(null);
    this.router.navigate(['']);
  }
}
