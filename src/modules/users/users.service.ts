import { User, userModel } from "./users.model";
import { IRegisterUser } from "../dtos/registerUser.dto";

export class UsersService {
  async registerUser(data: IRegisterUser) {
    return userModel.create(data);
  }
}
