import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/types/BaseModel.type";
import { Course } from "../../../../courses/infrastructure/mongo/models/Course";
import { ItemCurrency } from "../../../item.enums";
import { Order } from "./Order";

export class Item extends BaseModel {
  @prop()
  name: string;

  @prop({ type: "numeric" })
  amount: number;

  @prop()
  currency: ItemCurrency;

  @prop()
  order: Ref<Order>;

  @prop({ ref: () => Course })
  course: Ref<Course>;
}
