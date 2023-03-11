import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { User } from "../../../../users/infrastructure/mongo/models/User";

modelOptions({ schemaOptions: { timestamps: true } });
export class Admin {
  @prop({ ref: () => User })
  public user!: Ref<User>;
}
