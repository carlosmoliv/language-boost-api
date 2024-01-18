import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
class User {
  @prop()
  name!: string

  @prop()
  email!: string

  @prop()
  password!: string

  @prop()
  status!: string

  @prop()
  role!: string

  @prop()
  verifiedAt?: Date
}

export const MongoUserModel = getModelForClass(User)
