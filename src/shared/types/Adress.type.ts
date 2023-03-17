import { prop } from "@typegoose/typegoose";

export class Address {
  @prop()
  street: string;

  @prop()
  streetNumber: string;

  @prop()
  zipCode: string;

  @prop()
  neighborhood: string;

  @prop()
  city: string;

  @prop()
  complement: string;

  @prop()
  country: string;
}
