import { Types } from "mongoose";
import { Base } from "@typegoose/typegoose/lib/defaultClasses";

export class BaseModel implements Base {
  public _id: Types.ObjectId;
  public id: string;
}
