import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../services/token-storage.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private retries = 0;

  constructor(private tokenService: TokenStorageService, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    console.log(authReq.url);
    return next.handle(authReq);

    // return next.handle(authReq).pipe(catchError(error => {
    //   if (this.retries < 5 && error instanceof HttpErrorResponse && !authReq.url.includes('token') && error.status === 401) {
    //     return this.handle401Error(authReq, next);
    //   }

    //   return throwError(() => new Error(error));
    // }));
  }

  
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.retries++;
      if (this.retries > 5) {
        this.authService.logout();
        return throwError(() => new Error('Max retries found'));
      }

      const token = this.tokenService.getRefreshToken();

      if (token)
        return this.authService.refreshToken(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            this.tokenService.saveToken(token.access.token);
            this.tokenService.saveRefreshToken(token.refresh.token);
            
            return next.handle(this.addTokenHeader(request, token.access.token));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.authService.logout();
            return throwError(() => new Error(err));
          })
        );
    }

    return throwError(() => new Error('Unauthorized'));
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }
}
