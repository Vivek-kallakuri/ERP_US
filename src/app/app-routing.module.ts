import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ManagerApprovalComponent } from './components/manager-approval/manager-approval.component';
import { TimesheetListComponent } from './components/timesheet-list/timesheet-list.component';


const routes: Routes = [
  { path: 'timesheets', component: TimesheetComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'manager-approval', component: ManagerApprovalComponent },
  { path: 'timesheet-list', component: TimesheetListComponent },
  { path: '', redirectTo: '/timesheets', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
