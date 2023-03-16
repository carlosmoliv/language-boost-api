import mongoose from "mongoose";
import {
  adminModel,
  studentModel,
  tutorModel,
  userModel,
} from "../../../../models";
import { ICreateUser } from "../../../domain/dtos/ICreateUser.dto";
import { IUsersRepository } from "../../../domain/repositories/IUserRepository";
import { Role } from "../../../domain/user.enums";
import { User } from "../models/User";

export class UsersRepository implements IUsersRepository {
  async findByEmailAndRole(email: string, role: Role): Promise<User | null> {
    return userModel.findOne({ email, active: true, role }).select("+password");
  }

  async createUserStudent(data: ICreateUser) {
    const studentId = new mongoose.Types.ObjectId();

    return userModel
      .create({ ...data, role: Role.student, student: studentId })
      .then(async (user: User) => {
        if (user) {
          await studentModel.create({
            _id: studentId,
            user: user._id,
          });
        }

        return user;
      });
  }

  async createUserTutor(data: ICreateUser) {
    const tutorId = new mongoose.Types.ObjectId();

    return userModel
      .create({ ...data, role: Role.tutor, tutor: tutorId })
      .then(async (user: User) => {
        if (user) {
          await tutorModel.create({
            _id: tutorId,
            user: user._id,
          });
        }

        return user;
      });
  }

  async createUserAdmin(data: ICreateUser) {
    const adminId = new mongoose.Types.ObjectId();

    return userModel
      .create({ ...data, role: Role.admin, admin: adminId })
      .then(async (user: User) => {
        if (user) {
          await adminModel.create({
            _id: adminId,
            user: user._id,
          });
        }

        return user;
      });
  }
}
