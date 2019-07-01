import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';

import { CalendarEvent, UpdateCalendarEventMutationVariables } from '../../models';
import {
  UpdateCalendarEventMutation,
  UpdateCalendarEventMutationResponse,
  CalendarEventDetailsQuery,
  CalendarEventDetailsReponse
} from '../../graphql';

@Component({
  selector: 'app-update-calendar-event-container',
  templateUrl: './update-calendar-event-container.component.html',
  styleUrls: ['./update-calendar-event-container.component.scss']
})
export class UpdateCalendarEventContainerComponent implements OnInit {
  calendarEvent$: Observable<CalendarEvent>;
  error$: Observable<any>;
  eventStatuses$: Observable<string[]> = of(['UPCOMING', 'STARTED', 'COMPLETED']);
  attengingStatuses$: Observable<string[]> = of(['GOING', 'PENDING', 'NOT GOING']);

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly calendarEventDetailsQuery: CalendarEventDetailsQuery,
    private readonly updateCalendarEventMutation: UpdateCalendarEventMutation
  ) {}

  ngOnInit() {
    this.calendarEvent$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('eventId')),
      switchMap((id: string) =>
        this.calendarEventDetailsQuery
          .watch({ id })
          .valueChanges.pipe(map((result: ApolloQueryResult<CalendarEventDetailsReponse>) => result.data.event))
      )
    );
  }

  /**
   * Use the `UpdateCalendarEventMutation` service to update the `CalendarEvent` record through
   * the graphql mutation. On a successful response of the returned, created `CalendarEvent`,
   * route to the event details page from the created id. If an error occurs, display the
   * error;
   * @param event `CalendarEvent` the submited calendar event
   */
  updateCalendarEvent(event: CalendarEvent) {
    const variables: UpdateCalendarEventMutationVariables = {
      id: event._id,
      event
    };
    this.updateCalendarEventMutation.mutate(variables).subscribe(({ data }) => {
      const updated: CalendarEvent = data.updateEvent;
      // CalendarEvent successfully update, route to event details page
      this.router.navigate(['/calendar-events/details', updated._id]);
    });
  }
}
