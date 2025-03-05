import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  roleId: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'https://localhost:7037/api/Employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
