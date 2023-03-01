import { userModel } from "./users.model";
import { IRegisterUser } from "./dtos/registerUser.dto";
import { ILoginUserByEmail } from "./dtos/loginUserByEmail.dto";
import { comparePasswords } from "../../../utils/bcrypt.utils";
import { createToken } from "../../../utils/jwt.utils";
import { logger } from "../../../utils/logger.utils";

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
      .orFail(() => new Error("Invalid credentials."));

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = createToken({ userId: user.id });
    user.token = token;

    return {
      token: token,
      email: user.email,
      name: user.name,
    };
  }
}
