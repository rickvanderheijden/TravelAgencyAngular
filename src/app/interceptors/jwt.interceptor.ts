import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {AuthenticationService} from '../auth/auth.service';
import swal from 'sweetalert2';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = localStorage.getItem('access_token');
    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError( error => {
        console.log( error);
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401(request, next );
        } else {
          swal('Ooops', 'Er is iets niet goed gegaan', 'error');
          throw new Error(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  private handle401(request: HttpRequest<any>, next: HttpHandler) {
    if ( !this.isRefreshing ) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.token);
          return next.handle(this.addToken(request, token.token));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter( token => token != null),
        take(1),
        switchMap( jwt => {
          return next.handle(this.addToken(request, jwt));
        })
      )
    }

  }
}
