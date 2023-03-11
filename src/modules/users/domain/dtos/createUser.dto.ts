import mongoose from "mongoose";
import { Role } from "../users.enums";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}
