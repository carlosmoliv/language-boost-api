import { prop, getModelForClass } from '@typegoose/typegoose'

class User {
  @prop()
  public name!: string

  @prop()
  public email!: string

  @prop()
  public password!: string
}

export const MongoUserModel = getModelForClass(User)
