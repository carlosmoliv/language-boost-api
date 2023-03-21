import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/types/BaseModel.type";
import { Item } from "./Item";
import { Student } from "../../../../users/infrastructure/mongo/models/Student";
import { OrderStatus } from "../../../order.enums";

export class Order extends BaseModel {
  @prop()
  number: number;

  @prop()
  status: OrderStatus;

  @prop({ type: "numeric" })
  total: number;

  @prop({ type: "numeric" })
  amount: number;

  @prop()
  items: Ref<Item>[];

  @prop({ ref: () => Student })
  students: Ref<Student>[];
}
