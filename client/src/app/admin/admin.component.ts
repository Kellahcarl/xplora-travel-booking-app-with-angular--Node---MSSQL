import { Component } from '@angular/core';
import { Modal, Ripple, initTE, Tab, Input, Datepicker } from 'tw-elements';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TourServiceService } from '../services/tour-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { BookingServiceService } from '../services/booking-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  addTourForm: FormGroup;
  tours: any[] = [];
  users: any[] = [];
  bookings: any[] = [];

  ngOnInit() {
    initTE({ Tab, Input, Modal, Ripple, Datepicker });
    this.initForm();

    this.fetchTours();
    this.fetchUsers();
    this.fetchBookings();
  }

  token = localStorage.getItem('token');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tourService: TourServiceService,
    private userService: UserServiceService,
    private bookingService: BookingServiceService
  ) {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
    }
    this.addTourForm = this.fb.group({
      tour_name: ['', Validators.required],
      tour_description: ['', Validators.required],
      tour_img: ['', Validators.required],
      price: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  }

  private initForm = () => {
    this.addTourForm = this.fb.group({
      tour_name: ['', Validators.required],
      tour_description: ['', Validators.required],
      tour_img: ['', Validators.required],
      price: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  };

  onAddTourSubmit = () => {
    if (this.addTourForm.valid) {
      const tourDetails = this.addTourForm.value;

      if (!this.token) {
        console.error('Token not found.');
        return;
      }

      this.tourService
        .createTour(tourDetails, this.token)
        .then((res) => {
          // console.log(res);

          if (res.message) {
            Swal.fire({
              icon: 'success',
              title: 'Tour added successfully!',
              text: `${res.message}`,
            });
            setTimeout(() => {
              this.initForm();
              this.fetchTours();
              this.router.navigate(['/admin']);
            }, 5000);
          }
          if (res.error) {
            Swal.fire({
              icon: 'error',
              title: 'Please try Again',
              text: `${res.error}`,
            });
          }
        })
        .catch((error) => {
          console.log(error);

          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong!',
            icon: 'error',
          });
        });
    }
  };

  isAuthenticated = (): boolean => {
    return !!this.token;
  };

  fetchTours = async () => {
    if (!this.token) {
      console.error('Token not found.');
      return;
    }
    try {
      this.tours = await this.tourService.getAllTours(this.token);
      // console.log(this.tours);
    } catch (error) {
      console.error(error);
    }
  };

  fetchBookings = async () => {
    if (!this.token) {
      console.error('Token not found.');
      return;
    }
    try {
      this.bookings = await this.bookingService.getAllBookings(this.token);
      console.log(this.bookings);
    } catch (error) {
      console.error(error);
    }
  };

  fetchReviews = async () => {};

  fetchUsers = async () => {
    if (!this.token) {
      console.error('Token not found.');
      return;
    }

    try {
      this.users = await this.userService.getAllUsers(this.token);
      // console.log(this.users);
    } catch (error) {
      console.error(error);
    }
  };

  async deleteTour(tour_id: string) {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn bg-red-500 text-white p-2 rounded-lg',
          cancelButton: 'btn bg-green-500 text-white p-2 rounded-lg ',
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it !',
          cancelButtonText: 'No, cancel !  ',
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            if (!this.token) {
              console.error('Token not found.');
              return;
            }
            await this.tourService.deleteTourById(tour_id, this.token);
            await this.fetchTours();

            swalWithBootstrapButtons.fire({
              title: 'Deleted!',
              text: 'Your tour has been deleted.',
              icon: 'success',
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: 'Cancelled',
              text: 'Your imaginary tour is safe :)',
              icon: 'error',
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  }
  async deleteUser(_id: string) {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn bg-red-500 text-white p-2 rounded-lg',
          cancelButton: 'btn bg-green-500 text-white p-2 rounded-lg ',
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it !',
          cancelButtonText: 'No, cancel !  ',
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            if (!this.token) {
              console.error('Token not found.');
              return;
            }
            await this.userService.deleteUserById(_id, this.token);
            await this.fetchUsers();

            swalWithBootstrapButtons.fire({
              title: 'Deleted!',
              text: 'the user has been deleted.',
              icon: 'success',
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: 'Cancelled',
              text: 'this user is safe :)',
              icon: 'error',
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  }
  async deleteBooking(booking_id: string) {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn bg-red-500 text-white p-2 rounded-lg',
          cancelButton: 'btn bg-green-500 text-white p-2 rounded-lg ',
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it !',
          cancelButtonText: 'No, cancel !  ',
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            if (!this.token) {
              console.error('Token not found.');
              return;
            }
            await this.bookingService.deleteBookingById(booking_id, this.token);
            await this.fetchUsers();

            swalWithBootstrapButtons.fire({
              title: 'Deleted!',
              text: 'the user has been deleted.',
              icon: 'success',
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: 'Cancelled',
              text: 'this Booking is safe :)',
              icon: 'error',
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  }
}
