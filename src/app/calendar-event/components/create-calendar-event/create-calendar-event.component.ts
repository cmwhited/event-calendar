import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import * as _moment from 'moment';

import { CalendarEventBuilder } from '../../form-builders';
import { CalendarEvent } from '../../models';

@Component({
  selector: 'app-create-calendar-event',
  templateUrl: './create-calendar-event.component.html',
  styleUrls: ['./create-calendar-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCalendarEventComponent implements OnInit {
  private _calendarEventFormGroup: FormGroup;
  private _eventStatuses: string[];
  private _attendingStatuses: string[];

  @Input() set attendingStatuses(statuses: string[]) {
    this._attendingStatuses = statuses;
  }
  get attendingStatuses(): string[] {
    return this._attendingStatuses;
  }

  @Input() set eventStatuses(statuses: string[]) {
    this._eventStatuses = statuses;
  }
  get eventStatuses(): string[] {
    return this._eventStatuses;
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

  @Output() createCalendarEventEmitter: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

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
    this.createCalendarEventEmitter.emit(event);
  }
}
