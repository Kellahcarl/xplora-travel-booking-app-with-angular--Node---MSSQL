export interface updatUser {
  id: string;
  fullName: string;
  email: string;
}
export interface user extends updatUser {
  password: string;
}

export interface ExtendedUser extends Request {
  info?: updatUser;
}

export interface checkDetailsUser {
  _id: string;
  fullname: string;
  email: string;
}