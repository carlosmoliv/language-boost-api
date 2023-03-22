import { User } from "../../infrastructure/mongo/models/User";
import { ICreateUser } from "../dtos/ICreateUser.dto";
import { Role } from "../user.enums";

export interface IUserRepository {
  findByIdAndRole(userId: string, role: Role): Promise<User | null>;
  findByEmailAndRole(email: string, role: Role): Promise<User | null>;
  createUserStudent(data: ICreateUser): Promise<User>;
  createUserTutor(data: ICreateUser): Promise<User>;
  createUserAdmin(data: ICreateUser): Promise<User>;
}
