import { Component, OnInit } from '@angular/core';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  timesheets: any[] = [];

  timesheet = { // Ensure this object exists for submission
    employeeId: 1,  // Replace with actual employee ID
    date: new Date(),
    hoursWorked: 8,
    status: 'Pending'
  };

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit() {
    this.loadTimesheets();
  }

  loadTimesheets() {
    this.timesheetService.getTimesheets() // Pass a valid employeeId
      .subscribe(data => {
        this.timesheets = data;
      }, error => {
        console.error('Error fetching timesheets:', error);
      });
  }

  submitTimesheet() {
    this.timesheetService.submitTimesheet(this.timesheet)
      .subscribe(response => {
        console.log('Timesheet submitted:', response);
        this.loadTimesheets(); // Refresh timesheet list after submission
      }, error => {
        console.error('Error submitting timesheet:', error);
      });
  }
}
