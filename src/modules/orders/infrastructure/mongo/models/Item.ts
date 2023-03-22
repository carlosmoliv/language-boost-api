import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../../../../shared/infrastructure/database/mongo/BaseModel.type";
import { Course } from "../../../../courses/infrastructure/mongo/models/Course";
import { ItemCurrency } from "../../../domain/enums/item.enums";
import { Order } from "./Order";

export class Item extends BaseModel {
  @prop()
  name!: string;

  @prop()
  amount!: number;

  @prop()
  currency!: ItemCurrency;

  @prop({ ref: () => Order })
  order!: Ref<Order>;

  @prop({ ref: () => Course })
  course!: Ref<Course>;
}
