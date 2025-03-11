import { Component } from '@angular/core';
import { AuditLogService } from '../services/audit-log.service';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent {
  userId: number = 0;
  startDate: string = '';
  endDate: string = '';
  logs: any[] = []; // ✅ Store logs

  constructor(private auditLogService: AuditLogService) {}

  fetchLogs(): void {
    if (!this.userId || !this.startDate || !this.endDate) {
      alert("Please enter User ID and Date Range!");
      return;
    }

    this.auditLogService.getUserLogs(this.userId, this.startDate, this.endDate).subscribe({
      next: (response) => {
        this.logs = response; // ✅ Store fetched logs
      },
      error: (error) => {
        console.error('Error fetching logs:', error);
        alert("Failed to fetch logs. Check API or database.");
      }
    });
  }
}
