import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements AfterViewInit {
  @ViewChild('employeeModal') employeeModal!: ElementRef;
  modalInstance: any;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(this.employeeModal.nativeElement);
  }

  openAddEmployeeModal(): void {
    // Navigate to the child route and show modal
    this.router.navigate(['employee-management/addEmployee']);
    this.modalInstance.show();
  }

  closeModal(): void {
    this.modalInstance.hide();
    this.router.navigate(['employee-management']);
  }
}
