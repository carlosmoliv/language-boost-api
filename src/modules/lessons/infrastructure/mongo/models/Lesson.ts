import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/domain/types/BaseModel.type";
import { Course } from "../../../../courses/infrastructure/mongo/models/Course";

export class Lesson extends BaseModel {
  @prop()
  public title!: string;

  @prop()
  public videoUrl!: string;

  @prop()
  public description?: string;

  @prop({ type: () => [String] })
  public materials?: string[];

  @prop({ ref: () => Course })
  public courseId: Ref<Course>;
}
