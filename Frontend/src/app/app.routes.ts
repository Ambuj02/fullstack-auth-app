import { Routes } from '@angular/router';
import { canActivate } from './core/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'signin',
    loadComponent: () => import('./auth/login/signin.component').then(m => m.SigninComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth/register/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [canActivate]
  }
];