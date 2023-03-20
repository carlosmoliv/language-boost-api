import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/types/BaseModel.type";
import { Item } from "../../../../Items/infrastructure/mongo/models/Item";
import { Student } from "../../../../students/infrastructure/mongo/models/Student";
import { OrderStatus } from "../../../domain/order.enums";

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
