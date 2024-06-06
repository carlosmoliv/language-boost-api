import { AvailabilitySlotProps } from '@domain/entities/tutor/availability-slot-props'

export class AvailabilitySlot {
  constructor (
    public day: string,
    public startTime: string,
    public endTime: string
  ) {}

  static create (props: AvailabilitySlotProps): AvailabilitySlot {
    return new AvailabilitySlot(
      props.day,
      props.startTime,
      props.endTime
    )
  }
}
