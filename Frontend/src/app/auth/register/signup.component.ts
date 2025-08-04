import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  email = '';
  password = '';
  message = '';
  success = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post<{ token: string, message: string }>(`${environment.apiBaseUrl}/auth/register`, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: res => {
        this.message = res.message;
        this.success = true;
      },
      error: err => {
        this.message = err.error?.message || 'Registration failed';
        this.success = false;
      }
    });
  }
}