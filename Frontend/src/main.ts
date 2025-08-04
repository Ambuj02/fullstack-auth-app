import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { TokenInterceptorFn } from './app/core/token.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([TokenInterceptorFn]))
  ]
}).catch(err => console.error(err));
