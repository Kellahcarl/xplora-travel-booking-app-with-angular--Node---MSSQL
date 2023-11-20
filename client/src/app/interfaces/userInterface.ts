export interface UpdateUser {
  id: string;
  fullName: string;
  email: string;
}
export interface User {
  password: string;
  fullName: string;
  email: string;
}

export interface ResetUser {
  id: string;
  password: string;
}

export interface checkDetailsUser {
  _id: string;
  fullname: string;
  email: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface userImage {
  imageUrl: string;
  user_id : string;
}
