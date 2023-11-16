import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReviewServiceService {
  constructor() {}

  private apiUrl = 'http://localhost:4000/review';

  async createReview(reviewDetails: any, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(reviewDetails),
    });

    return await response.json();
  }

  async getAllReviews(token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/`, {
      method: 'GET',
      headers: {
        token,
      },
    });

    return await response.json();
  }

  async getReviewById(reviewId: string, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${reviewId}`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }

  async updateReview(reviewDetails: any, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(reviewDetails),
    });

    return await response.json();
  }

  async deleteReviewById(reviewId: string, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }
}
