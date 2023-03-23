import { modelOptions, plugin, prop, Ref } from "@typegoose/typegoose";
import { autoIncrement, AutoIncSettings } from "mongoose-plugin-autoinc";
import { BaseModel } from "../../../../../shared/infrastructure/database/mongo/BaseModel";
import { Item } from "./Item";
import { OrderStatus } from "../../../domain/enums/order.enums";
import { User } from "../../../../users/infrastructure/mongo/models/User";

@modelOptions({ schemaOptions: { timestamps: true } })
@plugin<typeof autoIncrement, AutoIncSettings>(autoIncrement, {
  model: "Order",
  field: "number",
  startAt: 100000,
  unique: true,
})
export class Order extends BaseModel {
  @prop()
  number: number;

  @prop()
  status: OrderStatus;

  @prop()
  total: number;

  @prop()
  amount: number;

  @prop({ ref: () => Item })
  items: Ref<Item>[];

  @prop({ ref: () => User })
  students: Ref<User>[];
}
