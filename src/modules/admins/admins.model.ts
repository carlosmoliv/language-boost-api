import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { User } from "../users/users.model";

modelOptions({ schemaOptions: { timestamps: true } });
export class Admin {
  @prop({ ref: () => User })
  public user!: Ref<User>;
}
