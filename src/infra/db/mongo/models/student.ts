import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { User } from './mongo-user-model'

@modelOptions({ schemaOptions: { timestamps: true } })
class Student {
  @prop({ ref: () => User })
  user!: User
}

export const MongoStudentModel = getModelForClass(Student)
