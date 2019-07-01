import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { CalendarEvent } from '../../models';

@Component({
  selector: 'app-events-day-view',
  templateUrl: './events-day-view.component.html',
  styleUrls: ['./events-day-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsDayViewComponent {
  private _calendarEvents: CalendarEvent[];

  @Input() set calendarEvents(events: CalendarEvent[]) {
    if (!isNullOrUndefined(events)) {
      this._calendarEvents = events;
    }
  }
  get calendarEvents(): CalendarEvent[] {
    return this._calendarEvents;
  }

  @Output() viewEventDetailsEmitter: EventEmitter<string> = new EventEmitter<string>();

  onViewEventDetails(_id: string) {
    this.viewEventDetailsEmitter.emit(_id);
  }
}
