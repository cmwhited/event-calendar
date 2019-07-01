import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { CalendarEventByStartDateMap, CalendarEvent } from '../../models';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsListComponent {
  private _eventsMap: CalendarEventByStartDateMap;

  @Input() set calendarEventsMap(eventsMap: CalendarEventByStartDateMap) {
    if (!isNullOrUndefined(eventsMap)) {
      this._eventsMap = eventsMap;
    }
  }
  get calendarEventsMap(): CalendarEventByStartDateMap {
    return this._eventsMap;
  }
  get calendarEventsMapKeys(): string[] {
    return this.calendarEventsMap ? Object.keys(this.calendarEventsMap) : [];
  }

  eventsOnStartDate(eventStart: string): CalendarEvent[] {
    return this.calendarEventsMap[eventStart];
  }
}
