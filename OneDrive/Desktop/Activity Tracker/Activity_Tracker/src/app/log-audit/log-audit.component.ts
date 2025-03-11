import { Component } from '@angular/core';
import { AuditLogService } from '../services/audit-log.service'; // ✅ Ensure correct import path

@Component({
  selector: 'app-log-audit',
  templateUrl: './log-audit.component.html',
  styleUrls: ['./log-audit.component.css']
})
export class LogAuditComponent {
  userId: number = 0;
  action: string = '';
  timestamp: string = new Date().toISOString(); // ✅ Initialize timestamp
  message: string = '';

  constructor(private auditLogService: AuditLogService) {}

  /**
   * Handles submission of the audit log entry.
   * Performs validation and invokes the service to persist the log via an HTTP POST request.
   */
  submitLog(): void {
    if (!this.userId || !this.action.trim()) {
      this.message = '⚠️ Please enter a valid User ID and Action!';
      return;
    }
  
    this.auditLogService.logAction(this.userId, this.action).subscribe({
      next: (response) => {
        this.message = '✅ Action successfully logged!';
      },
      error: (error) => {
        console.error('Error logging action:', error);
        this.message = '❌ Failed to log action. Please try again later.';
      }
    });
  }
  
}
