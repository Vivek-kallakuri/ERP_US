import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Role {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'https://localhost:7037/api/Roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl);
  }

  updateUserRole(email: string, newRole: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/update`, { email, newRole });
  }
}