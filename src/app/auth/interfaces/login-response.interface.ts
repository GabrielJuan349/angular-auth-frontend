import { User } from "./user.inteface";

export interface LoginResponse{
  user:   User;
  token:  string;
}
