export interface IUserData {
  username: string;
  password: string;
}

export interface IUser {
  username: string;
  role: "user" | "admin";
}

export interface IUserDto extends IUser {
  token: string;
}
