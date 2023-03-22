import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/infrastructure/database/mongo/BaseModel.type";
import { User } from "./User";

export class Tutor extends BaseModel {
  @prop({ ref: () => User })
  public user!: Ref<User>;
}
