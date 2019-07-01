import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';

import { CalendarEvent } from '../../models';
import { CalendarEventDetailsQuery, CalendarEventDetailsReponse } from '../../graphql';

@Component({
  selector: 'app-calendar-event-details-container',
  templateUrl: './calendar-event-details-container.component.html',
  styleUrls: ['./calendar-event-details-container.component.scss']
})
export class CalendarEventDetailsContainerComponent implements OnInit {
  calendarEvent$: Observable<CalendarEvent>;

  constructor(private readonly route: ActivatedRoute, private readonly calendarEventDetailsQuery: CalendarEventDetailsQuery) {}

  ngOnInit() {
    this.calendarEvent$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('eventId')),
      switchMap((id: string) =>
        this.calendarEventDetailsQuery
          .watch({ id })
          .valueChanges.pipe(map((results: ApolloQueryResult<CalendarEventDetailsReponse>) => results.data.event))
      )
    );
  }
}
