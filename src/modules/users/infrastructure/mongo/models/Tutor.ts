import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/types/BaseModel.type";
import { User } from "./User";

export class Tutor extends BaseModel {
  @prop({ ref: () => User })
  public user!: Ref<User>;
}
