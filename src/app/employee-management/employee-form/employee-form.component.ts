import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService, Employee } from '../employee.service';
import { Router } from '@angular/router';
import { RoleService, Role } from '../../shared/role.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  roles: Role[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      roleId: ['', Validators.required]
    });

    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
      },
      error: (err) => {
        console.error("Error fetching roles", err);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value;
      this.employeeService.createEmployee(employee).subscribe({
        next: () => {
          this.router.navigate(['/employee-management']);
        },
        error: (err) => {
          console.error("Error creating employee", err);
        }
      });
    }
  }
}
