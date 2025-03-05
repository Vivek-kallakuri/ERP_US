import { Component, OnInit } from '@angular/core';
import { RoleService, Role } from '../../shared/role.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  roles: Role[] = [];

  constructor(private roleService: RoleService, private authService: AuthService) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      },
      error => {
        console.error('Error fetching roles', error);
      }
    );
  }

  // Checks if the current user has access to Employee Management by verifying roles.
  hasEmployeeManagementAccess(): boolean {
    // Retrieve the stored currentUser object (which includes the JWT token)
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser || !currentUser.token) {
      return false;
    }

    const token = currentUser.token;
    try {
      // JWT format: header.payload.signature. Decode the payload.
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      // The role claim key might be set as 'role' or the default .NET key.
      let userRoles = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload['role'];
      if (!userRoles) {
        return false;
      }

      if (Array.isArray(userRoles)) {
        return userRoles.includes('Admin') || userRoles.includes('Manager');
      } else if (typeof userRoles === 'string') {
        return userRoles === 'Admin' || userRoles === 'Manager';
      }
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return false;
    }

    return false;
  }
}
