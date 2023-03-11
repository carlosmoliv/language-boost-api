import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose";

import { Base } from "../../../../../shared/domain/types/base.type";
import { hashPassword } from "../../../../../shared/infrastructure/adapters/bcrypt";
import { Admin } from "../../../../admins/infrastructure/mongo/models/Admin";
import { Student } from "../../../../students/infrastructure/mongo/models/Student";
import { Tutor } from "../../../../tutors/infrastructure/mongo/models/tutors.model";
import { Role } from "../../../domain/users.enums";

@pre<User>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }

  next();
})
@modelOptions({ schemaOptions: { timestamps: true } })
export class User extends Base {
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
