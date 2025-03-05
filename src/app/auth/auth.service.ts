import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

export interface JwtPayload {
  exp: number;
  iat: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7037/api/Auth';
  private tokenKey = 'authToken';
  public isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap((response: any) => {
          this.setToken(response.token);
          this.isLoggedIn$.next(true);
        })
      );
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, { email, password });
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn$.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = (jwt_decode as any)(token) as JwtPayload;
        // Look for the proper role claim name
        const rolesClaim = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        return rolesClaim
          ? (Array.isArray(rolesClaim) ? rolesClaim : [rolesClaim])
          : [];
      } catch (error) {
        console.error('Error decoding token', error);
      }
    }
    return [];
  }
}
