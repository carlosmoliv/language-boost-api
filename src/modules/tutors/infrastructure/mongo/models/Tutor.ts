import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/domain/types/BaseModel.type";
import { User } from "../../../../users/infrastructure/mongo/models/User";

export class Tutor extends BaseModel {
  @prop({ ref: () => User })
  public user!: Ref<User>;
}
