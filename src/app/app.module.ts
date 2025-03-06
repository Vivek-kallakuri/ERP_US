import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { TimesheetListComponent } from './components/timesheet-list/timesheet-list.component';
import { ManagerApprovalComponent } from './components/manager-approval/manager-approval.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { ModelComponent } from './src/app/model/model.component';

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



