// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { Input, initTE, Ripple } from 'tw-elements';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  imageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService
  ) {
    this.userForm = this.fb.group({
      fullName: [''],
      email: [''],
    });

    this.imageForm = this.fb.group({
      imageUrl: [''],
    });
  }

  token = localStorage.getItem('token');
  user_id = localStorage.getItem('user_id');

  ngOnInit(): void {
    initTE({ Input, Ripple });

    this.userForm = this.fb.group({
      fullName: [''],
      email: [''],
    });

    this.imageForm = this.fb.group({
      imageUrl: [''],
    });

    if (!this.token || !this.user_id) {
      console.error('Token not found.');
      return;
    }

    // Fetch user details and patch the forms
    this.userService
      .getUserById(this.user_id, this.token)
      .then((userDetails) => {
        // console.log(userDetails);

        this.userForm.patchValue({
          fullName: userDetails.fullName,
          email: userDetails.email,
        });

        this.imageForm.patchValue({
          imageUrl: userDetails.imageUrl,
        });
      });
  }

  updateProfile(): void {
    if (!this.token) {
      console.error('Token not found.');
      return;
    }

    const userDetails = this.userForm.value;
    userDetails.id = this.user_id;
    // console.log(userDetails);

    this.userService.updateUser(userDetails, this.token).then((response) => {
      console.log(response);
    });
  }

  updateImage(): void {
    if (!this.token) {
      console.error('Token not found.');
      return;
    }

    const imageDetails = this.imageForm.value;
    imageDetails.user_id = this.user_id;
    this.userService
      .updateUserImage(imageDetails, this.token)
      .then((response) => {
        console.log(response);
      });
  }
}
