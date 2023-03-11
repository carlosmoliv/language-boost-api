import { User } from "../../infrastructure/mongo/models/User";
import { ICreateUser } from "../dtos/createUser.dto";
import { Role } from "../users.enums";

export interface IUsersRepository {
  findByEmailAndRole(email: string, role: Role): Promise<User | null>;
  createUserStudent(data: ICreateUser): Promise<User>;
  createUserTutor(data: ICreateUser): Promise<User>;
  createUserAdmin(data: ICreateUser): Promise<User>;
}
