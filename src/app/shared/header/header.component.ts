import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}

  goToProfileSettings(): void {
    this.router.navigate(['/profile-settings']);
  }

  resetPassword(): void {
    this.router.navigate(['/reset-password']);
  }

  logout(): void {
    // Use AuthService.logout() to clear the correct token and update authentication state.
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
