import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
    <h2>Welcome to Dashboard!</h2>
    <button (click)="auth.logout()">Logout</button>
  `
})
export class DashboardComponent {
  constructor(public auth: AuthService) {}
}
