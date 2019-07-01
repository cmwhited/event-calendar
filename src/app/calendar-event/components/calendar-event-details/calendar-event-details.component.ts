import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { isEqual } from 'lodash';
import { isNullOrUndefined } from 'util';
import * as _moment from 'moment';

import { CalendarEvent, Guest } from '../../models';

@Component({
  selector: 'app-calendar-event-details',
  templateUrl: './calendar-event-details.component.html',
  styleUrls: ['./calendar-event-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventDetailsComponent {
  private _calendarEvent: CalendarEvent;

  @Input() set calendarEvent(event: CalendarEvent) {
    if (!isNullOrUndefined(event) && (isNullOrUndefined(this._calendarEvent) || !isEqual(this._calendarEvent, event))) {
      this._calendarEvent = event;
    }
  }
  get calendarEvent(): CalendarEvent {
    return this._calendarEvent;
  }
  get guests(): Guest[] {
    return this.calendarEvent && this.calendarEvent.guests && this.calendarEvent.guests.length > 0 ? this.calendarEvent.guests : [];
  }

  get currentDate(): string {
    return _moment().format('YYYY-MM-DD');
  }
}
