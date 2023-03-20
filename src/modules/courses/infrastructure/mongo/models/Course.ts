import { prop, Ref } from "@typegoose/typegoose";
import { CourseStatus, CourseType } from "../../../domain/course.enums";

import { BaseModel } from "../../../../../shared/types/BaseModel.type";
import { Module } from "../../../../module/Infrastructure/mongo/models/Module";

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

  @prop({ ref: () => Module })
  public modules?: Ref<Module>[];
}
