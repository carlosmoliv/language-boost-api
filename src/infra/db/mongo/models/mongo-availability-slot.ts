import { prop } from '@typegoose/typegoose'

export class MongoAvailabilitySlot {
  @prop()
  public day!: string

  @prop()
  public startTime!: string

  @prop()
  public endTime!: string
}
