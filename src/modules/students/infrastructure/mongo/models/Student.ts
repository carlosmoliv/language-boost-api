import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Address } from "../../../../../shared/domain/types/adress.type";
import { User } from "../../../../users/infrastructure/mongo/models/User";

modelOptions({ schemaOptions: { timestamps: true } });
export class Student {
  @prop()
  public address?: Address;

  @prop()
  public phone?: string;

  @prop({ ref: () => User })
  public user: Ref<User>;
}
