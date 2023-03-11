import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../../../users/infrastructure/mongo/models/User";

export class Tutor {
  @prop({ ref: () => User })
  public user!: Ref<User>;
}
