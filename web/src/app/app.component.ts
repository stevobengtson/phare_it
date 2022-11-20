import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.loggedInSubject().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    })
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
