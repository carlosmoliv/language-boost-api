import { userModel } from "./users.model";
import { IRegisterUser } from "./dtos/registerUser.dto";
import { ILoginUserByEmail } from "./dtos/loginUserByEmail.dto";

import { createToken } from "../../../utils/jwt.utils";
import { comparePasswords } from "../../../utils/bcrypt.utils";

import { AppError } from "../../../utils/errors.utils";

export class UsersService {
  async registerUser(data: IRegisterUser) {
    return userModel.create(data);
  }

  async loginUserByEmail(data: ILoginUserByEmail) {
    const { email, password } = data;

    const user = await userModel
      .findOne({
        email,
        active: true,
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
