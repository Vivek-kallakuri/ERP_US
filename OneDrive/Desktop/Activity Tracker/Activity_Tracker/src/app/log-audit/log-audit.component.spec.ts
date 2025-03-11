import { Component } from '@angular/core';
import { AuditLogService } from '../services/audit-log.service';

@Component({
  selector: 'app-log-audit',
  templateUrl: './log-audit.component.html',
  styleUrls: ['./log-audit.component.css']
})
export class LogAuditComponent {
  userId: number = 0;
  action: string = '';
  message: string = '';

  constructor(private auditLogService: AuditLogService) {}

  submitLog() {
    if (!this.userId || !this.action.trim()) {
      this.message = 'Please enter User ID and Action!';
      return;
    }

    this.auditLogService.logAction(this.userId, this.action).subscribe(
      (response) => {
        this.message = 'Action logged successfully!';
      },
      (error) => {
        console.error('Error logging action:', error);
        this.message = 'Failed to log action.';
      }
    );
  }
}
