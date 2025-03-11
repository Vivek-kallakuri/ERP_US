import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  private apiUrl = 'https://localhost:7277/api/auditlog'; // ✅ Correct API base URL

  constructor(private http: HttpClient) {}

  /**
   * Fetch audit logs based on user ID and date range.
   * @param userId - ID of the user whose logs to fetch.
   * @param startDate - Start date of the logs (YYYY-MM-DD).
   * @param endDate - End date of the logs (YYYY-MM-DD).
   * @returns Observable of audit log data.
   */
  getUserLogs(userId: number, startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-logs?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
  }
  

  /**
   * Log a new action to the audit log.
   * @param userId - User ID performing the action.
   * @param action - Description of the action.
   * @returns Observable of the response.
   */
  logAction(userId: number, action: string): Observable<any> {
    const logData = {
      userId: userId,
      action: action,
      timestamp: timestamp //t timestamp in UTC format
    };
    return this.http.post(`${this.apiUrl}/log`, logData);
  }
}
