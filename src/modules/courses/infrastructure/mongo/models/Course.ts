import { prop, Ref } from "@typegoose/typegoose";
import { CourseType } from "../../../domain/courses.enums";
import { Lesson } from "../../../../lessons/infrastructure/infrastructure/mongo/models/Lesson";
import { BaseModel } from "../../../../../shared/domain/types/BaseModel.type";

export class Course extends BaseModel {
  @prop()
  public title!: string;

  @prop({ default: CourseType.paid })
  public type!: CourseType;

  @prop()
  public description?: string;

  @prop({ ref: () => Lesson })
  public lessons?: Ref<Lesson>[];
}
