import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private apiUrl = 'https://localhost:7094/api/timesheets'; // Update to match your API endpoint

  constructor(private http: HttpClient) { }

  submitTimesheet(timesheet: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, timesheet);
  }

  // Get all timesheets
  getTimesheets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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
  
  approveTimesheet(timesheetId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/approve/${timesheetId}`, {});
  }

  rejectTimesheet(timesheetId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/reject/${timesheetId}`, {});
  }
}

