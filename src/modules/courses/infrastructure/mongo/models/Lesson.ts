import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/domain/types/BaseModel.type";
import { Course } from "./Course";

export class Lesson extends BaseModel {
  @prop()
  public title!: string;

  @prop()
  public videoUrl!: string;

  @prop()
  public description?: string;

  @prop()
  public materials?: string[];

  @prop()
  public courseId: Ref<Course>;
}
