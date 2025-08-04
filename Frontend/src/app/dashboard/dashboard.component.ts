import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: []
})
export class DashboardComponent implements OnInit {
  secureInfo: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.http.get(`${environment.apiBaseUrl}/auth/secure-info`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'text'
      }).subscribe(
        (data) => this.secureInfo = data,
        (error) => this.secureInfo = 'Access denied or session expired.'
      );
    } else {
      this.secureInfo = 'Not authenticated';
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }
}