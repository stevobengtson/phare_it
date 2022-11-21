import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';
import { UserLogin } from './responses/userlogin';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
    this.loggedIn.next(!!tokenService.getToken())
  }

  loggedInSubject(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<UserLogin>(environment.apiUrl + '/token', {
      email,
      password
    }, httpOptions).pipe(
      map((data: UserLogin) => {
        this.tokenService.saveToken(data.tokens.access.token);
        this.tokenService.saveRefreshToken(data.tokens.refresh.token);
        this.tokenService.saveUser(data.user);
        this.loggedIn.next(true);
        return data;
      }),
      catchError( (error: any, caught: Observable<Object>) => {
        console.error(error);
        this.logout();
        return caught;
      })
    );
  }

  logout(): void {
    // @todo: call DELETE /token
    this.tokenService.signOut();
    this.loggedIn.next(false);
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + '/users/', {
      name,
      email,
      password
    }, httpOptions);
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.patch(environment.apiUrl = '/token', {
      refreshToken
    });
  }
}
