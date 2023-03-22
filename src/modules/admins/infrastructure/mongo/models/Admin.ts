import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/infrastructure/database/mongo/BaseModel.type";
import { User } from "../../../../users/infrastructure/mongo/models/User";

modelOptions({ schemaOptions: { timestamps: true } });
export class Admin extends BaseModel {
  @prop({ ref: () => User })
  public user!: Ref<User>;
}
