import mongoose from "mongoose";
import {
  adminsModel,
  studentsModel,
  tutorsModel,
  usersModel,
} from "../../../../models";
import { ICreateUser } from "../../../domain/dtos/createUser.dto";
import { IUsersRepository } from "../../../domain/repositories/IUsersRepository";
import { Role } from "../../../domain/users.enums";
import { User } from "../models/User";

export class UsersRepository implements IUsersRepository {
  async findByEmailAndRole(email: string, role: Role): Promise<User | null> {
    return usersModel
      .findOne({ email, active: true, role })
      .select("+password");
  }

  async createUserStudent(data: ICreateUser) {
    const studentId = new mongoose.Types.ObjectId();

    return usersModel
      .create({ ...data, role: Role.student, student: studentId })
      .then(async (user: User) => {
        if (user) {
          await studentsModel.create({
            _id: studentId,
            user: user._id,
          });
        }

        return user;
      });
  }

  async createUserTutor(data: ICreateUser) {
    const tutorId = new mongoose.Types.ObjectId();

    return usersModel
      .create({ ...data, role: Role.tutor, tutor: tutorId })
      .then(async (user: User) => {
        if (user) {
          await tutorsModel.create({
            _id: tutorId,
            user: user._id,
          });
        }

        return user;
      });
  }

  async createUserAdmin(data: ICreateUser) {
    const adminId = new mongoose.Types.ObjectId();

    return usersModel
      .create({ ...data, role: Role.admin, admin: adminId })
      .then(async (user: User) => {
        if (user) {
          await adminsModel.create({
            _id: adminId,
            user: user._id,
          });
        }

        return user;
      });
  }
}
