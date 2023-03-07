import mongoose from "mongoose";

import { IRegisterUser } from "./dtos/registerUser.dto";
import { ILoginUserByEmail } from "./dtos/loginUserByEmail.dto";
import { createToken } from "../../utils/jwt.utils";
import { comparePasswords } from "../../utils/bcrypt.utils";
import { AppError } from "../../utils/errors.utils";
import { Role } from "./users.enums";
import { logger } from "../../utils/logger.utils";
import { adminsModel, studentsModel, tutorsModel, userModel } from "../models";

export class UsersService {
  async registerUser(data: IRegisterUser, role: Role = Role.student) {
    switch (role) {
      case Role.student:
        const studentId = new mongoose.Types.ObjectId();

        return userModel
          .create({ ...data, student: studentId })
          .then(async (user) => {
            if (user) {
              await studentsModel.create({
                _id: studentId,
                user: user._id,
              });
            }

            return user;
          });
      case Role.tutor:
        const tutorId = new mongoose.Types.ObjectId();

        return userModel
          .create({ ...data, role: Role.tutor, tutor: tutorId })
          .then(async (user) => {
            if (user) {
              await tutorsModel.create({
                _id: tutorId,
                user: user._id,
              });
            }

            return user;
          });

      case Role.admin:
        const adminId = new mongoose.Types.ObjectId();

        return userModel
          .create({ ...data, role: Role.admin, admin: adminId })
          .then(async (user) => {
            if (user) {
              await adminsModel.create({
                _id: adminId,
                user: user._id,
              });
            }

            return user;
          });

      default:
        throw new AppError(
          "InvalidUserRoleError",
          "Invalid user role provided."
        );
    }
  }

  async logInUserByEmail(data: ILoginUserByEmail, role: Role = Role.student) {
    const { email, password } = data;

    const user = await userModel
      .findOne({
        email,
        active: true,
        role,
      })
      .select("+password")
      .orFail(
        () => new AppError("AuthenticationError", "Invalid credentials.", 401)
      );

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid)
      throw new AppError("AuthenticationError", "Invalid credentials.", 401);

    const token = createToken({ userId: user.id });
    user.token = token;

    return {
      token: token,
      email: user.email,
      name: user.name,
    };
  }
}
