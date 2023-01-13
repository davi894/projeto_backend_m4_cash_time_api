interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export { IUserRequest, IUser, IUserLogin, IUserUpdate };
