export type LoggedUser = {
  email: string;
  login: string;
  isAdmin: boolean;
}

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  pinCode: string;
  uid: string;
  isAdmin: boolean;
  beginDate: string;
  endDate: string;
}