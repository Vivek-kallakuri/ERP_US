import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  searchQuery: string = '';

  constructor(private employeeService: EmployeeService, private router:Router) {}

  ngOnInit() {
    this.loadEmployees();
  }
  goToComponent() {
    console.log("routing to add");
    this.router.navigate(['/employees/add']); // path
    
  }
  // Method to fetch employees from the service
  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  // Method to filter employees based on search query
  filterEmployees() {
    if (this.searchQuery.trim()) {
      return this.employees.filter(emp =>
        emp.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    return this.employees;
  }
  // Method to handle editing an employee
  editEmployee(emp: any) {
    console.log('Editing Employee:', emp);
    this.router.navigate(['/employees/edit', emp.id])
  }

  // calls `loadEmployees()` after deleting an employee
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      console.log('Employee deleted successfully');
      this.loadEmployees(); // Reloading employees after deletion
    });
  }
}
