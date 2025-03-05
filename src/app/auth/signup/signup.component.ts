import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      this.authService.signup(email, password).subscribe({
        next: () => {
          this.showToastMessage("Signup successful! Redirecting to login page...");
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          this.showToastMessage("User already exists, redirecting to login page...");
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        }
      });
    }
  }

  showToastMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.toastMessage = '';
    }, 3000);
  }
}
