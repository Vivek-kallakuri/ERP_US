import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';


import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

@NgModule({
  declarations: [AppComponent, EmployeeListComponent, EmployeeFormComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, RouterModule, AppRoutingModule, HttpClientModule], // Add it to the imports array
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
