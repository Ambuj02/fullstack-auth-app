import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';
import { AuthService } from '../core/auth.service';
import { CommonModule, NgIf } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule,NgIf]
})
export class DashboardComponent implements OnInit {
  secureInfo: string = '';
  isAuthenticated = false;

  constructor(private http: HttpClient, private router : Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      const token = this.authService.getToken();
      this.http.get(`${environment.apiBaseUrl}/auth/secure-info`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'text'
      }).subscribe(
        (data) => this.secureInfo = data,
        (error) => this.secureInfo = 'Access denied or session expired.'
      );
    } else {
      this.secureInfo = 'You are not logged in.';
    }
  }
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}