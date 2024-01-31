import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'

import { Student } from '@infra/db/mongo/models'

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
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

  @prop({ ref: () => Student })
  student?: Ref<Student>
}

export const MongoUserModel = getModelForClass(User)
