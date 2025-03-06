import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  salary: number;
}


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5208/api/';

  constructor(private http: HttpClient) {}

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}Employees/GetEmployee/${id}`);
  }

  getEmployees(): Observable<any> {
    return this.http.get(this.apiUrl + 'Employees/GetEmployees');
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl + 'Employees/PostEmployee', employee);
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}Employees/PutEmployee/${id}`, employee);
  }
  

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl + 'Employees/DeleteEmployee'}/${id}`);
  }
}
