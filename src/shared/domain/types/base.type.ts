import mongoose from "mongoose";

export class Base {
  public _id: mongoose.Types.ObjectId;
  public id: string;
}
