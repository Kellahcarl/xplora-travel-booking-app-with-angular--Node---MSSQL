import { Component } from '@angular/core';
import { Input, Ripple, initTE } from 'tw-elements';
import { UserServiceService } from '../services/user-service.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  constructor(
    private userService: UserServiceService,
    private fb: FormBuilder
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    initTE({ Input, Ripple });
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit = () => {
    if (this.resetForm.valid) {
      this.userService.resetPassword(this.resetForm.value).then(
        (res) => {
          // console.log(res);

          if (res.message) {
            Swal.fire({
              title: 'Success!',
              text: `${res.message}`,
              icon: 'success',
              confirmButtonText: 'Ok',
            }).then((result) => {
              this.resetForm.reset();
            });
          }

          if (res.error) {
            Swal.fire({
              title: 'Error!',
              text: `${res.error}`,
              icon: 'error',
              confirmButtonText: 'Ok',
            }).then((result) => {
              this.resetForm.reset();
            });
          }
        },
        (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong!',
            icon: 'error',
            confirmButtonText: 'Ok',
          }).then((result) => {
            this.resetForm.reset();
          });
        }
      );
    }
  };
}
