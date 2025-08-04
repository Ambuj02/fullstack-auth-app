import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
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

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<{ token: string, message: string }>(`${environment.apiBaseUrl}/auth/login`, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: res => {
        this.message = res.message;
        this.success = true;
        localStorage.setItem('authToken', res.token);
        this.router.navigate(['/dashboard']);  
      },
      error: err => {
        this.message = err.error?.message || 'Login failed';
        this.success = false;
      }
    });
  }
}