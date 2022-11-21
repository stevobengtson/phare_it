import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.redirectUser();
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.redirectUser();
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  redirectUser(): void {
    // @todo: Route them back to where they came from (referrer)
    this.router.navigate(['/']);
  }
}
