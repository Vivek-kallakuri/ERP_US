import { Component, OnInit } from '@angular/core';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  timesheets: any[] = [];

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit() {
    this.loadTimesheets();
  }

  loadTimesheets() {
    this.timesheetService.getTimesheets().subscribe(data => {
      this.timesheets = data;
    }, error => {
      console.error('Error fetching timesheets:', error);
    });
  }
}