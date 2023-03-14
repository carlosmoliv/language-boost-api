import { Types } from "mongoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class BaseModel extends TimeStamps implements Base {
  public _id: Types.ObjectId;
  public id: string;
}
