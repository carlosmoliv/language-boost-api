import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/infrastructure/database/mongo/BaseModel";
import { Course } from "./Course";
import { Lesson } from "./Lesson";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Module extends BaseModel {
  @prop()
  public title!: string;

  @prop({ ref: () => Course })
  public courseId: Ref<Course>;

  @prop({ ref: () => Lesson })
  public lessons?: Ref<Lesson>[];
}
