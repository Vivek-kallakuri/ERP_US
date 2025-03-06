import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetComponent } from './components/timesheet/timesheet.component';

const routes: Routes = [
  { path: 'timesheets', component: TimesheetComponent },
  { path: '', redirectTo: '/timesheets', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
