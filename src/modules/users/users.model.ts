import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";

import { Role } from "./users.enums";
import { hashPassword } from "../../../utils/bcrypt.utils";

@pre<User>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }

  next();
})
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ unique: true })
  public email!: string;

  @prop()
  public password!: string;

  @prop()
  public name!: string;

  @prop({ default: true })
  public active: boolean;

  @prop({ default: Role.student })
  public role: Role;
}

export const userModel = getModelForClass(User);
