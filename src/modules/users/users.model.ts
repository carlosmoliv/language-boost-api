import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose";

import { Role } from "./users.enums";
import { hashPassword } from "../../../utils/bcrypt.utils";
import { Student } from "../students/students.model";
import { Admin } from "../admins/admins.model";
import { Tutor } from "../tutors/tutors.model";

@pre<User>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }

  next();
})
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  public token?: string;

  @prop({ unique: true })
  public email!: string;

  @prop({ select: false })
  public password!: string;

  @prop()
  public name!: string;

  @prop({ default: true })
  public active!: boolean;

  @prop({ default: Role.student })
  public role!: Role;

  @prop({ ref: () => Student })
  public student?: Ref<Student>;

  @prop({ ref: () => Tutor })
  public tutor?: Ref<Tutor>;

  @prop({ ref: () => Admin })
  public admin?: Ref<Admin>;
}
