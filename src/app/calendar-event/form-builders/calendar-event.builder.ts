import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

import { Guest, CalendarEvent } from '../models/calendar-event.model';

@Injectable()
export class CalendarEventBuilder {
  private static readonly EVENT_DATE_REGEX = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
  private static readonly EVENT_TIME_REGEX = new RegExp(/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/gm);

  private static guestFormModel(guest?: Guest) {
    return {
      _id: new FormControl(guest ? guest._id : null),
      name: new FormControl(guest ? guest.name : null, Validators.required),
      email: new FormControl(guest ? guest.email : null, Validators.compose([Validators.required, Validators.email])),
      attending: new FormControl(guest ? guest.attending : 'PENDING', Validators.required)
    };
  }

  private static calendarEventFormModel(fb: FormBuilder) {
    return {
      _id: new FormControl(null, null),
      status: new FormControl('UPCOMING', Validators.required),
      eventStart: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(this.EVENT_DATE_REGEX)])),
      startTime: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(this.EVENT_TIME_REGEX)])),
      eventEnd: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(this.EVENT_DATE_REGEX)])),
      endTime: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(this.EVENT_TIME_REGEX)])),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      location: new FormControl(null),
      recurring: new FormControl(null),
      guests: fb.array([])
    };
  }

  constructor(private readonly fb: FormBuilder) {}

  build(): FormGroup {
    return this.fb.group(CalendarEventBuilder.calendarEventFormModel(this.fb), { updateOn: 'blur' });
  }

  /**
   * Hydrate the supplied form group with the given `CalendarEvent` record to update the form groups current values.
   * Use this to edit an existing `CalendarEvent` record.
   * If the `CalendarEvent` has guests, push the guests into the form group guests control form array.
   * @param fg `FormGroup` the calendar event form group
   * @param event `CalendarEvent` the calendar event record
   */
  hydrate(fg: FormGroup, event: CalendarEvent) {
    fg.patchValue({
      _id: event._id,
      status: event.status,
      eventStart: event.eventStart,
      startTime: event.startTime,
      eventEnd: event.eventEnd,
      endTime: event.endTime,
      name: event.name,
      description: event.description,
      location: event.location,
      recurring: event.recurring
    });
    if (event.guests && event.guests.length > 0) {
      const guestsFormArray: FormArray = fg.get('guests') as FormArray;
      event.guests.map((guest: Guest) => {
        guestsFormArray.push(this.fb.group(CalendarEventBuilder.guestFormModel(guest), { updateOn: 'blur' }));
      });
    }
    fg.updateValueAndValidity();
  }

  /**
   * Add a guest form group model to the `CalendarEvent` guests form array control
   * @param fa `FormArray` the calendar event guests form array control
   */
  addGuest(fa: FormArray) {
    fa.push(this.fb.group(CalendarEventBuilder.guestFormModel()));
  }

  /**
   * Remove the guest entry at the supplied index from the `CalendarEvent` guests form array control
   * @param fa `FormArray` the calendar event guests form array control
   * @param index the index in the array to remove
   */
  removeGuest(fa: FormArray, index: number) {
    fa.removeAt(index);
  }
}
