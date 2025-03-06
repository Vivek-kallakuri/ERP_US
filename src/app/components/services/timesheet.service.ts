import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private apiUrl = 'https://localhost:7094/index.html'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Get all timesheets
  getTimesheets(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Add a new timesheet
  addTimesheet(timesheet: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, timesheet);
  }

  // Update a timesheet
  updateTimesheet(id: number, timesheet: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, timesheet);
  }

  // Delete a timesheet
  deleteTimesheet(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
