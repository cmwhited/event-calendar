import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import * as _moment from 'moment';

@Component({
  selector: 'app-calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventFormComponent {
  private _calendarEventFormGroup: FormGroup;
  private _guestsFormArray: FormArray;
  private _eventStatuses: string[];
  private _attendingStatuses: string[];

  @Input() set calendarEventFormGroup(fg: FormGroup) {
    this._calendarEventFormGroup = fg;
  }
  get calendarEventFormGroup(): FormGroup {
    return this._calendarEventFormGroup;
  }

  @Input() set guestsFormArray(fa: FormArray) {
    this._guestsFormArray = fa;
  }
  get guestsFormArray(): FormArray {
    return this._guestsFormArray;
  }

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

  get currentDate(): Date {
    return new Date();
  }

  @Output() addGuestEmitter: EventEmitter<undefined> = new EventEmitter<undefined>();
  @Output() removeGuestEmitter: EventEmitter<number> = new EventEmitter<number>();

  setEventDateValue(control: FormControl, value: Date) {
    control.patchValue(_moment(value).format('YYYY-MM-DD'));
    control.updateValueAndValidity();
  }

  onAddGuest() {
    this.addGuestEmitter.emit();
  }

  onRemoveGuest(index: number) {
    this.removeGuestEmitter.emit(index);
  }
}
