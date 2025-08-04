import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/auth`;
  private token = signal<string | null>(sessionStorage.getItem('token'));

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
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
    this.router.navigate(['/auth/login']);
  }
}
