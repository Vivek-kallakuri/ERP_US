import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: any = {
    id : '',
    name: '',
    email: '',
    phone: '',
    department: '',
    salary: ''
  };
  isEditMode: boolean = false;
  employeeId: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')! : null;

    if (this.employeeId) {
      this.isEditMode = true;
      this.loadEmployee();
    }
  }

  loadEmployee() {
    if (this.employeeId !== null) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe(
        (emp) => {
          console.log('Loaded Employee:', emp);
          this.employee = emp;
        },
        (error) => {
          console.error('Error loading employee:', error);
        }
      );
    }
  }

  onSubmit(form) {
    if (form.valid) {
      console.log('Form Submitted:', form.value);
      console.log('Edit Mode:', this.isEditMode);
      console.log('Employee Data:', this.employee);
  
      if (this.isEditMode) {
        this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(
          response => {
            console.log('Update Success:', response);
            this.router.navigate(['/employees']);
          },
          error => {
            console.error('Update Error:', error);
            this.router.navigate(['/employees']);
          }
        );
      } else {
        this.employee.id =0;
        this.employeeService.addEmployee(this.employee).subscribe(
          response => {
            console.log('Add Success:', response);
            this.router.navigate(['/employees']);
          },
          error => {
            console.error('Add Error:', error);
            this.router.navigate(['/employees']);
          }
        );
      }
    } else {
      console.log("Form is invalid");
    }
  }
  
}
