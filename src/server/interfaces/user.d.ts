export interface User {
  _id?: string;
  username: string;
  password: string;
}

export enum Groups {
  Admins = 'Admins',
  Users = 'Users',
}
