import { prop, Ref } from "@typegoose/typegoose";
import { CourseStatus, CourseType } from "../../../domain/courses.enums";

import { BaseModel } from "../../../../../shared/domain/types/BaseModel.type";
import { Lesson } from "./Lesson";

export class Course extends BaseModel {
  @prop()
  public title!: string;

  @prop({ default: CourseType.paid })
  public type!: CourseType;

  @prop()
  public description?: string;

  @prop()
  public price?: number;

  @prop({ default: CourseStatus.in_development })
  public status: CourseStatus;

  @prop({ ref: () => Lesson })
  public lessons?: Ref<Lesson>[];
}
