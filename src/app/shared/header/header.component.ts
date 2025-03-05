import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  goToProfileSettings(): void {
    this.router.navigate(['/profile-settings']);
  }

  resetPassword(): void {
    this.router.navigate(['/reset-password']);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
