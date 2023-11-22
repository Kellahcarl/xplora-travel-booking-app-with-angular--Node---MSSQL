import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Modal,
  Ripple,
  initTE,
  Datepicker,
  Input,
  Tab,
  Select,
} from 'tw-elements';
import { ReviewServiceService } from '../services/review-service.service';
import { TourServiceService } from '../services/tour-service.service';
import { UserServiceService } from '../services/user-service.service';
import { BookingServiceService } from '../services/booking-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],

})
export class UserComponent {
  addReviewForm: FormGroup;
  editReviewForm: FormGroup;
  editBookingForm: FormGroup;
  addBookingForm: FormGroup;
  tours: any[] = [];
  bookings: any[] = [];
  reviews: any[] = [];
  token = localStorage.getItem('token');
  user_id = localStorage.getItem('user_id');
  searchText =''

  singleTour: any[] = [];

  ngOnInit() {
    initTE({ Modal, Ripple, Datepicker, Input, Tab, Select });
    this.initForm();
    this.fetchTours();
    this.fetchBookings();
    this.fetchReviews();
  }

  initForm = () => {
    this.addBookingForm = this.fb.group({
      count: ['', Validators.required],
    });
    this.editBookingForm = this.fb.group({
      count: ['', Validators.required],
    });
    this.editReviewForm = this.fb.group({
      review_content: ['', Validators.required],
      review_rating: ['', Validators.required],
    });
    this.addReviewForm = this.fb.group({
      review_content: ['', Validators.required],
      review_rating: ['', Validators.required],
      tour_id: ['', Validators.required],
    });
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private reviewService: ReviewServiceService,
    private tourService: TourServiceService,
    private userService: UserServiceService,
    private bookingService: BookingServiceService
  ) {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    this.addBookingForm = this.fb.group({
      count: ['', Validators.required],
    });
    this.editBookingForm = this.fb.group({
      count: ['', Validators.required],
    });
    this.editReviewForm = this.fb.group({
      review_content: ['', Validators.required],
      review_rating: ['', Validators.required],
    });
    this.addReviewForm = this.fb.group({
      review_content: ['', Validators.required],
      review_rating: ['', Validators.required],
      tour_id: ['', Validators.required],
    });
  }
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

  createBooking = (tour_id: string, price: number) => {
    localStorage.setItem('tour_id', tour_id);
    localStorage.setItem('price', price.toString());
    this.fetchSingleTour(tour_id);
  };
  fetchSingleTour = async (tour_id: string) => {
    if (!this.token || !tour_id) {
      console.log('Token or Tour ID not found.');
      return;
    }
    await this.tourService
      .getTourById(tour_id, this.token)
      .then((res) => {
        // console.log(res);

        this.singleTour = res;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onAddBookingSubmit = () => {
    const tour_id = localStorage.getItem('tour_id');
    const user_id = localStorage.getItem('user_id');
    const price = localStorage.getItem('price');

    if (this.addBookingForm.valid) {
      const bookingDetails = this.addBookingForm.value;

      if (!this.token) {
        console.error('Token not found.');
        return;
      }

      bookingDetails.tour_id = tour_id;
      bookingDetails.user_id = user_id;

      if (price) {
        bookingDetails.total_price = bookingDetails.count * parseInt(price, 10);
      }

      // console.log(bookingDetails);

      this.bookingService
        .createBooking(bookingDetails, this.token)
        .then((res) => {
          // console.log(res);

          if (res.message) {
            Swal.fire({
              icon: 'success',
              title: 'Booking created successfully!',
              text: `${res.message}`,
            });
            setTimeout(() => {
              this.initForm();
              this.fetchTours();
              this.fetchBookings();
              this.router.navigate(['/user']);
              localStorage.removeItem('price');
              localStorage.removeItem('tour_id');
            }, 3000);
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

  fetchBookings = async () => {
    if (!this.token || !this.user_id) {
      console.error('Token or user ID not found.');
      return;
    }
    try {
      this.bookings = await this.bookingService.getUserBookings(
        this.user_id,
        this.token
      );
      // console.log(this.bookings);
    } catch (error) {
      console.error(error);
    }
  };
  editBooking = (booking_id: string, tour_id: string, price: number) => {
    localStorage.setItem('booking_id', booking_id);

    localStorage.setItem('tour_id', tour_id);
    localStorage.setItem('price', price.toString());
    this.fetchSingleBooking(booking_id);
  };

  onEditBookingSubmit = () => {
    const booking_id = localStorage.getItem('booking_id');
    const tour_id = localStorage.getItem('tour_id');
    const user_id = localStorage.getItem('user_id');
    const price = localStorage.getItem('price');

    if (this.editBookingForm.valid) {
      const bookingDetails = this.editBookingForm.value;

      bookingDetails.booking_id = booking_id;

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
              this.router.navigate(['/user']);
              localStorage.removeItem('booking_id');
              localStorage.removeItem('tour_id');
            }, 3000);
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
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
            await this.fetchBookings();

            swalWithBootstrapButtons.fire({
              title: 'Deleted!',
              text: 'the Booking has been deleted.',
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
  fetchReviews = async () => {
    if (!this.token || !this.user_id) {
      console.error('Token not found.');
      return;
    }
    try {
      this.reviews = await this.reviewService.getUserReview(
        this.user_id,
        this.token
      );
      // console.log(this.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  editReview = (review_id: string, tour_id: string) => {
    localStorage.setItem('review_id', review_id);
    localStorage.setItem('tour_id', tour_id);

    // this.fetchSingleBooking(booking_id);
  };

  onEditReviewSubmit = () => {
    const review_id = localStorage.getItem('review_id');
    const tour_id = localStorage.getItem('tour_id');
    const reviewer_id = localStorage.getItem('user_id');

    if (this.editReviewForm.valid) {
      const bookingDetails = this.editReviewForm.value;
      bookingDetails.review_id = review_id;
      bookingDetails.tour_id = tour_id;
      bookingDetails.reviewer_id = reviewer_id;

      // console.log(bookingDetails);

      if (!this.token) {
        console.error('Token not found.');
        return;
      }

      this.reviewService
        .updateReview(bookingDetails, this.token)
        .then((res) => {
          // console.log(res);

          if (res.message) {
            Swal.fire({
              icon: 'success',
              title: 'review edited successfully!',
              text: `${res.message}`,
            });
            setTimeout(() => {
              this.initForm();
              this.fetchReviews();
              this.router.navigate(['/user']);
              localStorage.removeItem('review_id');
              localStorage.removeItem('tour_id');
            }, 3000);
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
  async deleteReview(review_id: string) {
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
            await this.reviewService.deleteReviewById(review_id, this.token);
            await this.fetchReviews();

            swalWithBootstrapButtons.fire({
              title: 'Deleted!',
              text: 'the Review has been deleted.',
              icon: 'success',
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: 'Cancelled',
              text: 'this Review is safe :)',
              icon: 'error',
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  onAddReviewSubmit = () => {
    const reviewer_id = localStorage.getItem('user_id');

    if (this.addReviewForm.valid) {
      const reviewDetails = this.addReviewForm.value;

      if (!this.token) {
        console.error('Token not found.');
        return;
      }

      reviewDetails.reviewer_id = reviewer_id;

      // console.log(reviewDetails);

      this.reviewService
        .createReview(reviewDetails, this.token)
        .then((res) => {
          // console.log(res);

          if (res.message) {
            Swal.fire({
              icon: 'success',
              title: 'Review created successfully!',
              text: `${res.message}`,
            });
            setTimeout(() => {
              this.initForm();
              this.fetchReviews();
              this.router.navigate(['/user']);
            }, 3000);
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
}
