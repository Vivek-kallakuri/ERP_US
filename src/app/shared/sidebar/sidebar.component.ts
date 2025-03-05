import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  hasEmployeeManagementAccess(): boolean {
    const roles = this.authService.getUserRoles();
    return roles.includes('Admin') || roles.includes('Manager');
  }
}
