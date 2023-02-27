import { getModelForClass, prop } from "@typegoose/typegoose";

export class User {
  @prop()
  public email: string;

  @prop()
  public password: string;

  @prop()
  public name: string;

  @prop()
  public updateAt: Date;

  @prop()
  public createdAt: Date;
}

export const userModel = getModelForClass(User);
