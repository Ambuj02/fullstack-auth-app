import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';

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

  constructor(private authService: AuthService) {}


  onSubmit() {
    this.authService.register(this.email, this.password).subscribe({
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