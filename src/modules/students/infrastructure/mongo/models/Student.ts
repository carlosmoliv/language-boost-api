import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Address } from "../../../../../shared/domain/types/adress.type";
import { BaseModel } from "../../../../../shared/domain/types/BaseModel.type";
import { User } from "../../../../users/infrastructure/mongo/models/User";

modelOptions({ schemaOptions: { timestamps: true } });
export class Student extends BaseModel {
  @prop()
  public address?: Address;

  @prop()
  public phone?: string;

  @prop({ ref: () => User })
  public user: Ref<User>;
}
