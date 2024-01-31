import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

import { Onboarding } from '@infra/db/mongo/models'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Student {
  @prop({ _id: false })
  onboarding?: Onboarding
}

export const MongoStudentModel = getModelForClass(Student)
