export interface ILogin {
  data: {
    id: number;
    role: string;
  }
}

export interface IUser {
  user: {
    id: number;
    username: string;
    role: string;
    email?: string,
    password?: string,
  },
  token: void
}
