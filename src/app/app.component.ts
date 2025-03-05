import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  // An observable that emits true when a valid token exists, false otherwise.
  isAuthenticated$!: Observable<boolean>;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to changes in the currentUser observable and map it to a boolean.
    this.isAuthenticated$ = this.authService.currentUser.pipe(
      map(user => !!user && !!user.token)
    );
  }
}
