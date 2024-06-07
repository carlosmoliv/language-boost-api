import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

import { AvailabilitySlot } from '@domain/entities/tutor'
import { MongoAvailabilitySlot } from '@infra/db/mongo/models'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Tutor {
  @prop({ _id: false, type: () => [AvailabilitySlot] })
  availability?: MongoAvailabilitySlot[]
}

export const MongoTutorModel = getModelForClass(Tutor)
