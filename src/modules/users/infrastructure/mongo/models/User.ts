import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose";

import { Admin } from "../../../../admins/infrastructure/mongo/models/Admin";
import { Student } from "./Student";
import { Tutor } from "./Tutor";
import { Role } from "../../../domain/user.enums";
import { BaseModel } from "../../../../../shared/infrastructure/database/mongo/BaseModel.type";

@modelOptions({ schemaOptions: { timestamps: true } })
export class User extends BaseModel {
  token?: string;

  @prop({ unique: true })
  email!: string;

  @prop({ select: false })
  password!: string;

  @prop()
  name!: string;

  @prop({ default: true })
  active!: boolean;

  @prop({ default: Role.student })
  role!: Role;

  @prop({ ref: () => Student })
  student?: Ref<Student>;

  @prop({ ref: () => Tutor })
  tutor?: Ref<Tutor>;

  @prop({ ref: () => Admin })
  admin?: Ref<Admin>;
}
