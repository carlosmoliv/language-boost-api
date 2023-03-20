import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/types/BaseModel.type";
import { Course } from "../../../../courses/infrastructure/mongo/models/Course";
import { Order } from "../../../../orders/infrastructure/mongo/models/Order";

export class Item extends BaseModel {
  @prop({ type: "numeric" })
  amount: number;

  @prop()
  order: Ref<Order>;

  @prop({ ref: () => Course })
  course: Ref<Course>;
}
