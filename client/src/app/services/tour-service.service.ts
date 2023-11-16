import { Injectable } from '@angular/core';
import { CreateTour, UpdateTour } from '../interfaces/toursInterface';

@Injectable({
  providedIn: 'root',
})
export class TourServiceService {
  constructor() {}

  private apiUrl = 'http://localhost:4000/tour';

  async createTour(tourDetails: CreateTour, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(tourDetails),
    });

    return await response.json();
  }

  async getAllTours(token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }

  async getTourById(tourId: string, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${tourId}`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }

  async updateTour(tourDetails: UpdateTour, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(tourDetails),
    });

    return await response.json();
  }

  async deleteTourById(tourId: string, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${tourId}`, {
      method: 'DELETE',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }
}
