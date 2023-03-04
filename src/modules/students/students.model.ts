import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Address } from "../../shared/types/adress.type";
import { User } from "../users/users.model";

modelOptions({ schemaOptions: { timestamps: true } });
export class Student {
  @prop()
  public address?: Address;

  @prop()
  public phone?: string;

  @prop({ ref: () => User })
  public user: Ref<User>;
}
