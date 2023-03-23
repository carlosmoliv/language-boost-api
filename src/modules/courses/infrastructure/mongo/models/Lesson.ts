import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/infrastructure/database/mongo/BaseModel";
import { Module } from "./Module";

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
