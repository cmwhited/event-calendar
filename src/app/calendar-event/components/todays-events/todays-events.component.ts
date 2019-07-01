import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { CalendarEvent } from '../../models';

@Component({
  selector: 'app-todays-events',
  templateUrl: './todays-events.component.html',
  styleUrls: ['./todays-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodaysEventsComponent {
  private _calendarEvents: CalendarEvent[];
  private _eventStart: string;

  @Input() set calendarEvents(events: CalendarEvent[]) {
    if (!isNullOrUndefined(events)) {
      this._calendarEvents = events;
    }
  }
  get calendarEvents(): CalendarEvent[] {
    return this._calendarEvents;
  }

  @Input() set eventStart(start: string) {
    if (!isNullOrUndefined(start) && (isNullOrUndefined(this._eventStart) || this._eventStart !== start)) {
      this._eventStart = start;
    }
  }
  get eventStart(): string {
    return this._eventStart;
  }

  constructor() {}
}
