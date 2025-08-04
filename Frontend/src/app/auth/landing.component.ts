import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container text-center mt-5">
      <h2>Welcome</h2>
      <a class="btn btn-primary m-2" [routerLink]="['/signin']">Sign In</a>
      <a class="btn btn-success m-2" [routerLink]="['/signup']">Sign Up</a>
    </div>
  `
})
export class LandingComponent {}
