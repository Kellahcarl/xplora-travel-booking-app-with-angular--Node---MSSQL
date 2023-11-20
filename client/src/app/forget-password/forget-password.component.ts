import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input, Ripple, initTE } from 'tw-elements';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;

  ngOnInit() {
    initTE({ Input, Ripple });
    (this.forgetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      id: ['', Validators.required],
    })),
      { validator: this.passwordMatchValidator };
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserServiceService
  ) {
    this.forgetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      id: ['', Validators.required],
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password!.value !== confirmPassword!.value) {
      confirmPassword!.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword!.setErrors(null);
    }
  }

  onSubmit() {
    if (this.forgetPasswordForm.valid) {

      const { confirmPassword, ...userDetails } = this.forgetPasswordForm.value;

      this.userService
        .forgotPassword(userDetails)
        .then((response) => {
          if (response.message) {
            Swal.fire({
              icon: 'success',
              title: 'You have updated password Successfully',
              text: `${response.message}`,
            });
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          }
          if (response.error) {
            Swal.fire({
              icon: 'error',
              title: 'Please try Again',
              text: `${response.error}`,
            });
            setTimeout(() => {
              this.forgetPasswordForm.reset();
            }, 5000);
          }
        })
        .catch((error) => {
          // Handle errors
          console.log(error);
        });
    }
  }
}
