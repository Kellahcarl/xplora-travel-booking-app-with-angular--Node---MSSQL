import { Component } from '@angular/core';
import { Input, Ripple, initTE } from 'tw-elements';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  ngOnInit() {
    initTE({ Input, Ripple });
    this.initForm();
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserServiceService
  ) {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }
  private initForm() {
    this.registrationForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
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
    if (this.registrationForm.valid) {
      const { confirmPassword, ...userDetails } = this.registrationForm.value;
      // console.log(userDetails);

      // Call your user service to register the user
      this.userService
        .registerUser(userDetails)
        .then((response) => {
          // Handle the response as needed
          console.log(response);



          if (response.message) {
            Swal.fire({
              icon: 'success',
              title: 'You have registered Successfully',
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
              this.registrationForm.reset();
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
