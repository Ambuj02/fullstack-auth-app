import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: res => {
        this.message = res.message;
        this.success = true;
        this.authService.setToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.message = err.error?.message || 'Login failed';
        this.success = false;
      }
    });
  }
}