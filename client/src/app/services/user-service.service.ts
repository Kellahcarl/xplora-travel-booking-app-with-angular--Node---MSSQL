import { Injectable } from '@angular/core';
import {
  LoginUser,
  ResetUser,
  UpdateUser,
  User,
  userImage,
} from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor() {}

  private apiUrl = 'http://localhost:4000/user';

  async registerUser(userDetails: User): Promise<any> {
    const response = await fetch(`${this.apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });

    return await response.json();
  }

  async getAllUsers(token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }

  async getUserById(userId: string, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${userId}`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }

  async loginUser(credentials: LoginUser): Promise<any> {
    const response = await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    return await response.json();
  }

  async updateUser(userDetails: UpdateUser, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(userDetails),
    });

    return await response.json();
  }


  async updateUserImage(userDetails: userImage, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(userDetails),
    });

    return await response.json();
  }

  async deleteUserById(userId: string, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${userId}`, {
      method: 'DELETE',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }

  async checkUserDetails(token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/check_user_details`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }

  async forgotPassword(email: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    return await response.json();
  }

  async resetPassword(resetDetails: ResetUser): Promise<any> {
    const response = await fetch(`${this.apiUrl}/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetDetails),
    });

    return await response.json();
  }
}
