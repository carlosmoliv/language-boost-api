import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Address } from "../../../../../shared/types/Adress.type";
import { BaseModel } from "../../../../../shared/types/BaseModel.type";
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
