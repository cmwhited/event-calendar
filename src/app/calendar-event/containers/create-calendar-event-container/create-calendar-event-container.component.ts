import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { CalendarEvent } from '../../models';
import { CreateCalendarEventMutation } from '../../graphql/mutations';

@Component({
  selector: 'app-create-calendar-event-container',
  templateUrl: './create-calendar-event-container.component.html',
  styleUrls: ['./create-calendar-event-container.component.scss']
})
export class CreateCalendarEventContainerComponent {
  error$: Observable<any>;
  eventStatuses$: Observable<string[]> = of(['UPCOMING', 'STARTED', 'COMPLETED']);
  attengingStatuses$: Observable<string[]> = of(['GOING', 'PENDING', 'NOT_GOING']);

  constructor(private readonly createCalendarEventMutation: CreateCalendarEventMutation, private readonly router: Router) {}

  /**
   * Use the `CreateCalendarEventMutation` services to create the `CalendarEvent` record through
   * the graphql mutation. On a successful response of the returned, created `CalendarEvent`,
   * route to the event details page from the created id. If an error occurs, display the
   * error;
   * @param event `CalendarEvent` the submited calendar event
   */
  createCalendarEvent(event: CalendarEvent) {
    this.createCalendarEventMutation.mutate({ event }).subscribe(({ created }) => {
      // CalendarEvent successfully created, route to event details page
      this.router.navigate(['/calendar-events/details', created._id]);
    });
  }
}
