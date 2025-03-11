import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ManagerApprovalComponent } from './components/manager-approval/manager-approval.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TimesheetListComponent } from './components/timesheet-list/timesheet-list.component';
import { ModelComponent } from './model/model.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ManagerApprovalComponent,
    TimesheetComponent,
    TimesheetListComponent,
    ModelComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



