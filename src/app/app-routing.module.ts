import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EmployeeFormComponent } from './employee-management/employee-form/employee-form.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { 
    path: 'employee-management', 
    component: EmployeeManagementComponent, 
    canActivate: [AuthGuard],
    children: [
      // For modal approach, you might later invoke a modal; here we define a route if needed.
      { path: 'addEmployee', component: EmployeeFormComponent }
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
