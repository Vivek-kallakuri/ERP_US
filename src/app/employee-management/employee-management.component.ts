import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService, Employee } from './employee.service';

declare var bootstrap: any;

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit, AfterViewInit {
  @ViewChild('employeeModal') employeeModal!: ElementRef;
  modalInstance: any;

  employees: Employee[] = []; // Store fetched employees here

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  // 1. Load employees on init
  ngOnInit(): void {
    this.loadEmployees();
  }

  // 2. Initialize the Bootstrap modal after the view is ready
  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(this.employeeModal.nativeElement);
  }

  // 3. Fetch employees from the backend
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error fetching employees', err);
      }
    });
  }

  // 4. Open the "Add Employee" modal
  openAddEmployeeModal(): void {
    // Navigate to the child route and show modal
    this.router.navigate(['employee-management/addEmployee']);
    this.modalInstance.show();
  }

  // 5. Close the modal
  closeModal(): void {
    this.modalInstance.hide();
    this.router.navigate(['employee-management']);
  }

  // 6. (Optional) Delete an employee
  deleteEmployee(id: number): void {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        // Reload the list
        this.loadEmployees();
      },
      error: (err) => {
        console.error('Error deleting employee', err);
      }
    });
  }
}
