import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../users/users.model";

export class Tutor {
  @prop({ ref: () => User })
  public user!: Ref<User>;
}
