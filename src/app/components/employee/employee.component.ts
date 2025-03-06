import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

}
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}