import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor (
    private auth: AuthService,
    private router: Router,
  ) { }

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isLoggedIn() && request.url.startsWith('/api')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
        }
      });
    }
    return next.handle(request).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.auth.logout();
            this.router.navigate(['/login']);
          } else if (err.status === 429) {
            // this.toast.show(EToastSeverities.ERROR, ECommonErrors.E_429);
          } else if (Math.floor(err.status / 10) === 50) {
            // this.toast.show(EToastSeverities.ERROR, ECommonErrors.E_50X);
          }
          return null;
        }
      }));
  }
}