import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingServiceService {
  constructor() {}

  private apiUrl = 'http://localhost:4000/booking';

  async createBooking(bookingDetails: any, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(bookingDetails),
    });

    return await response.json();
  }

  async getAllBookings(token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }

  async getBookingById(bookingId: string, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${bookingId}`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }

  async updateBooking(bookingDetails: any, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(bookingDetails),
    });

    return await response.json();
  }

  async deleteBookingById(bookingId: string, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${bookingId}`, {
      method: 'DELETE',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }
}
