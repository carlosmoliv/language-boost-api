import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../shared/types/BaseModel.type";
import { Course } from "../../../courses/infrastructure/mongo/models/Course";
import { Lesson } from "../../../lessons/infrastructure/mongo/models/Lesson";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Module extends BaseModel {
  @prop()
  public title!: string;

  @prop({ type: () => [Lesson] })
  public lessons?: Lesson[];

  @prop({ ref: () => Course })
  public courseId: Ref<Course>;
}
