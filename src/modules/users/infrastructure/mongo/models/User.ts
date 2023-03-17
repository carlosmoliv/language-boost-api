import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose";

import { Admin } from "../../../../admins/infrastructure/mongo/models/Admin";
import { Student } from "../../../../students/infrastructure/mongo/models/Student";
import { Tutor } from "../../../../tutors/infrastructure/mongo/models/Tutor";
import { Role } from "../../../domain/user.enums";
import { BaseModel } from "../../../../../shared/types/BaseModel.type";

@modelOptions({ schemaOptions: { timestamps: true } })
export class User extends BaseModel {
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
