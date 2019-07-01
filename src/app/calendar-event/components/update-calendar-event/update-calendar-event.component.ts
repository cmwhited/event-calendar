import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { isEqual } from 'lodash';
import * as _moment from 'moment';

import { CalendarEventBuilder } from '../../form-builders';
import { CalendarEvent } from '../../models';

@Component({
  selector: 'app-update-calendar-event',
  templateUrl: './update-calendar-event.component.html',
  styleUrls: ['./update-calendar-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateCalendarEventComponent implements OnInit {
  private _calendarEvent: CalendarEvent;
  private _calendarEventFormGroup: FormGroup;
  private _eventStatuses: string[];
  private _attendingStatuses: string[];

  @Input() set calendarEvent(event: CalendarEvent) {
    if (!isNullOrUndefined(event) && (isNullOrUndefined(this._calendarEvent) || !isEqual(event, this._calendarEvent))) {
      this._calendarEvent = event;
      this.calendarEventBuilder.hydrate(this.calendarEventFormGroup, this.calendarEvent);
    }
  }
  get calendarEvent(): CalendarEvent {
    return this._calendarEvent;
  }

  @Input() set eventStatuses(statuses: string[]) {
    this._eventStatuses = statuses;
  }
  get eventStatuses(): string[] {
    return this._eventStatuses;
  }

  @Input() set attendingStatuses(statuses: string[]) {
    this._attendingStatuses = statuses;
  }
  get attendingStatuses(): string[] {
    return this._attendingStatuses;
  }

  set calendarEventFormGroup(fg: FormGroup) {
    this._calendarEventFormGroup = fg;
  }
  get calendarEventFormGroup(): FormGroup {
    return this._calendarEventFormGroup;
  }
  get guestsFormArray(): FormArray {
    return this.calendarEventFormGroup ? (this.calendarEventFormGroup.get('guests') as FormArray) : null;
  }

  @Output() updateCalendarEventEmitter: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

  constructor(private readonly calendarEventBuilder: CalendarEventBuilder) {}

  ngOnInit() {
    this.calendarEventFormGroup = this.calendarEventBuilder.build();
  }

  addGuest() {
    this.calendarEventBuilder.addGuest(this.guestsFormArray);
  }

  removeGuest(index: number) {
    this.calendarEventBuilder.removeGuest(this.guestsFormArray, index);
  }

  onSubmit(event: CalendarEvent) {
    this.updateCalendarEventEmitter.emit(event);
  }
}
