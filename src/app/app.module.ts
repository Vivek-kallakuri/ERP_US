import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Auth module & components
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
// Employee management
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EmployeeFormComponent } from './employee-management/employee-form/employee-form.component';
import { EmployeeService } from './employee-management/employee.service';
// Guards
import { AuthGuard } from './guards/auth.guard';
// Shared components
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DarkModeToggleComponent } from './shared/dark-mode-toggle/dark-mode-toggle.component';
import { RoleService } from './shared/role.service';
import JwtDecode from 'jwt-decode';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    EmployeeManagementComponent,
    EmployeeFormComponent,
    HeaderComponent,
    SidebarComponent,
    DarkModeToggleComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    EmployeeService,
    RoleService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
