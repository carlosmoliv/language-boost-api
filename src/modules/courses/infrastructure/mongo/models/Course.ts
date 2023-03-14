import { prop, Ref } from "@typegoose/typegoose";
import { CourseType } from "../../../domain/courses.enums";

import { BaseModel } from "../../../../../shared/domain/types/BaseModel.type";
import { Lesson } from "../../../../lessons/infrastructure/mongo/models/Lesson";

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
