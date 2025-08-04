import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  email = '';
  password = '';
  message = '';
  success = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post<{ token: string, message: string }>(`${environment.apiBaseUrl}/auth/login`, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: res => {
        this.message = res.message;
        this.success = true;
        this.http.get(`${environment.apiBaseUrl}/auth/secure-info`, {
          headers: {
            Authorization: `Bearer ${res.token}`
          },
          responseType: 'text'
        }).subscribe(
          (data) => {
            this.message = data;
            this.success = true;
          },
          (err) => {
            this.message = 'Access denied';
            this.success = false;
          }
        );
      },
      error: err => {
        this.message = err.error?.message || 'Login failed';
        this.success = false;
      }
    });
  }
}