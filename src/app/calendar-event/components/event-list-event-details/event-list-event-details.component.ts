import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { isEqual } from 'lodash';

import { CalendarEvent } from '../../models';

@Component({
  selector: 'app-event-list-event-details',
  templateUrl: './event-list-event-details.component.html',
  styleUrls: ['./event-list-event-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListEventDetailsComponent {
  private _event: CalendarEvent;

  @Input() set calendarEvent(event: CalendarEvent) {
    if (!isNullOrUndefined(event) && (isNullOrUndefined(this._event) || !isEqual(this._event, event))) {
      this._event = event;
    }
  }
  get calendarEvent(): CalendarEvent {
    return this._event;
  }

  @Output() viewEventDetailsEmitter: EventEmitter<string> = new EventEmitter<string>();

  onViewEventDetails(_id: string) {
    this.viewEventDetailsEmitter.emit(_id);
  }
}
