import { prop } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/domain/types/BaseModel.type";

export class Lesson extends BaseModel {
  @prop()
  public title!: string;

  @prop()
  public video!: string;

  @prop()
  public description?: string;

  @prop()
  public materials?: string[];
}
