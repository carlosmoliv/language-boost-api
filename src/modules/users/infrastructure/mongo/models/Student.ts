import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Address } from "../../../../../shared/infrastructure/database/mongo/types/Adress.type";
import { BaseModel } from "../../../../../shared/infrastructure/database/mongo/BaseModel";
import { User } from "./User";

modelOptions({ schemaOptions: { timestamps: true } });
export class Student extends BaseModel {
  @prop()
  public address?: Address;

  @prop()
  public phone?: string;

  @prop({ ref: () => User })
  public user: Ref<User>;
}
