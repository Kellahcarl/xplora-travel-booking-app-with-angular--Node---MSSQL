import { Component } from '@angular/core';
import { Modal, Ripple, initTE, Tab, Input, Datepicker } from 'tw-elements';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TourServiceService } from '../services/tour-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { BookingServiceService } from '../services/booking-service.service';
import { ReviewServiceService } from '../services/review-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  editBookingForm: FormGroup;
  editUserForm: FormGroup;
  addTourForm: FormGroup;
  editTourForm: FormGroup;
  tours: any[] = [];
  users: any[] = [];
  bookings: any[] = [];
  reviews: any[] = [];

  ngOnInit() {
    initTE({ Tab, Input, Modal, Ripple, Datepicker });
    this.initForm();

    this.fetchTours();
    this.fetchUsers();
    this.fetchBookings();
    this.fetchReviews();
  }

  token = localStorage.getItem('token');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private reviewService: ReviewServiceService,
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
    this.editTourForm = this.fb.group({
      tour_name: ['', Validators.required],
      tour_description: ['', Validators.required],
      tour_img: ['', Validators.required],
      price: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
    this.editUserForm = this.fb.group({
      email: ['', Validators.required],
      fullName: ['', Validators.required],
    });
    this.editBookingForm = this.fb.group({
      count: ['', Validators.required],
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
    this.editTourForm = this.fb.group({
      tour_name: ['', Validators.required],
      tour_description: ['', Validators.required],
      tour_img: ['', Validators.required],
      price: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
    this.editUserForm = this.fb.group({
      email: ['', Validators.required],
      fullName: ['', Validators.required],
    });
    this.editBookingForm = this.fb.group({
      count: ['', Validators.required],
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

      tourDetails.start_date = new Date(tourDetails.start_date);
      tourDetails.end_date = new Date(tourDetails.end_date);

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

  onEditUserSubmit = () => {
    const user_id = localStorage.getItem('user_id');

    if (this.editUserForm.valid) {
      const userDetails = this.editUserForm.value;

      userDetails.id = user_id;

      // console.log(userDetails);

      if (!this.token) {
        console.error('Token not found.');
        return;
      }

      this.userService
        .updateUser(userDetails, this.token)
        .then((res) => {
          console.log(res);

          if (res.message) {
            Swal.fire({
              icon: 'success',
              title: 'user edited successfully!',
              text: `${res.message}`,
            });
            setTimeout(() => {
              this.initForm();
              this.fetchUsers();
              this.router.navigate(['/admin']);
              localStorage.removeItem('_id');
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

  editUser = (user_id: string) => {
    localStorage.setItem('user_id', user_id);
    this.fetchSingleUser(user_id);
  };

  editTour = (tour_id: string) => {
    localStorage.setItem('tour_id', tour_id);
    this.fetchSingleTour(tour_id);
  };

  editBooking = (
    booking_id: string,
    tour_id: string,
    user_id: string,
    price: number
  ) => {
    localStorage.setItem('booking_id', booking_id);
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('tour_id', tour_id);
    localStorage.setItem('price', price.toString());
    this.fetchSingleBooking(booking_id)
  };

  onEditBookingSubmit = () => {
    const booking_id = localStorage.getItem('booking_id');
    const tour_id = localStorage.getItem('tour_id');
    const user_id = localStorage.getItem('user_id');
    const price = localStorage.getItem('price');

    if (this.editBookingForm.valid) {
      const bookingDetails = this.editBookingForm.value;

      bookingDetails.booking_id = booking_id;
      bookingDetails.start_date = new Date(bookingDetails.start_date);
      bookingDetails.end_date = new Date(bookingDetails.end_date);
      bookingDetails.tour_id = tour_id;
      bookingDetails.user_id = user_id;

      if (price) {
        bookingDetails.total_price = bookingDetails.count * parseInt(price, 10);
      }

      // console.log(bookingDetails);

      if (!this.token) {
        console.error('Token not found.');
        return;
      }

      this.bookingService
        .updateBooking(bookingDetails, this.token)
        .then((res) => {
          // console.log(res);

          if (res.message) {
            Swal.fire({
              icon: 'success',
              title: 'Booking edited successfully!',
              text: `${res.message}`,
            });
            setTimeout(() => {
              this.initForm();
              this.fetchBookings();
              this.router.navigate(['/admin']);
              localStorage.removeItem('booking_id');
              localStorage.removeItem('tour_id');
              localStorage.removeItem('user_id');
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
  onEditTourSubmit = () => {
    const tour_id = localStorage.getItem('tour_id');

    if (this.editTourForm.valid) {
      const tourDetails = this.editTourForm.value;

      tourDetails.tour_id = tour_id;
      tourDetails.start_date = new Date(tourDetails.start_date);
      tourDetails.end_date = new Date(tourDetails.end_date);

      // console.log(tourDetails);

      if (!this.token) {
        console.error('Token not found.');
        return;
      }

      this.tourService
        .updateTour(tourDetails, this.token)
        .then((res) => {
          console.log(res);

          if (res.message) {
            Swal.fire({
              icon: 'success',
              title: 'Tour edited successfully!',
              text: `${res.message}`,
            });
            setTimeout(() => {
              this.initForm();
              this.fetchTours();
              this.router.navigate(['/admin']);
              localStorage.removeItem('tour_id');
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

  fetchSingleTour = async (tour_id: string) => {
    if (!this.token || !tour_id) {
      console.error('Token or Tour ID not found.');
      return;
    }
    await this.tourService
      .getTourById(tour_id, this.token)
      .then((res) => {
        // console.log(res);
        this.editTourForm.patchValue({
          tour_name: res.tour_name,
          tour_description: res.tour_description,
          tour_img: res.tour_img,
          price: res.price,
          start_date: res.start_date,
          end_date: res.end_date,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchSingleUser = async (user_id: string) => {
    if (!this.token || !user_id) {
      console.error('Token or Tour ID not found.');
      return;
    }
    await this.userService
      .getUserById(user_id, this.token)
      .then((res) => {
        console.log(res);
        this.editUserForm.patchValue({
          fullName: res.fullName,
          email: res.email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchSingleBooking = async (booking_id: string) => {
    if (!this.token || !booking_id) {
      console.error('Token or Tour ID not found.');
      return;
    }
    await this.bookingService
      .getBookingById(booking_id, this.token)
      .then((res) => {
        // console.log(res);
        this.editBookingForm.patchValue({
          count: res.count,
          start_date: res.start_date,
          end_date: res.end_date,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
      // console.log(this.bookings);
    } catch (error) {
      console.error(error);
    }
  };

  fetchReviews = async () => {
    if (!this.token) {
      console.error('Token not found.');
      return;
    }
    try {
      this.reviews = await this.reviewService.getAllReviews(this.token);
      // console.log(this.reviews);
    } catch (error) {
      console.error(error);
    }
  };

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
