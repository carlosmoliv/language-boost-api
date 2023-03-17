import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/types/BaseModel.type";
import { Module } from "../../../../module/Infrastructure/models/Module";

export class Lesson extends BaseModel {
  @prop()
  public title!: string;

  @prop()
  public videoUrl!: string;

  @prop()
  public description?: string;

  @prop({ type: () => [String] })
  public materials?: string[];

  @prop({ ref: () => Module })
  public moduleId: Ref<Module>;
}
