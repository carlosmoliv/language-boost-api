import { getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Student {}

export const MongoStudentModel = getModelForClass(Student)
