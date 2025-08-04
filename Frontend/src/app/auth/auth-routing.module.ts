import { Routes } from '@angular/router';
import { SigninComponent } from './login/signin.component';
import { SignupComponent } from './register/signup.component';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent }
];
