import { Pipe, PipeTransform } from '@angular/core';

import { AttendingStatus } from '../models/calendar-event.model';

const attendingStatusToIconMap = {
  GOING: 'done',
  PENDING: 'more_horiz',
  NOT_GOING: 'thumb_down'
};

@Pipe({
  name: 'guestAttendingIcon'
})
export class GuestAttendingIconPipe implements PipeTransform {
  transform(value: AttendingStatus): string {
    return attendingStatusToIconMap[value];
  }
}
