import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as moment from 'moment';

import { CalendarEvent, CalendarEventRangeQueryVariables } from '../../models';
import { CalendarEventsInRangeQuery } from '../../graphql';

@Component({
  selector: 'app-todays-events-container',
  templateUrl: './todays-events-container.component.html',
  styleUrls: ['./todays-events-container.component.scss']
})
export class TodaysEventsContainerComponent implements OnInit {
  calendarEvents$: Observable<CalendarEvent[]>;
  eventStart$: Observable<string>;

  constructor(private readonly route: ActivatedRoute, private readonly calendarEventsInRangeQuery: CalendarEventsInRangeQuery) {}

  ngOnInit() {
    this.eventStart$ = this.route.paramMap.pipe(map((params: ParamMap) => params.get('eventStart')));
    this.calendarEvents$ = this.eventStart$.pipe(
      switchMap((eventStart: string) => {
        const start = moment(eventStart);
        const end = moment(start).add(1, 'day');
        const variables: CalendarEventRangeQueryVariables = {
          start: start.format('YYYY-MM-DD'),
          end: end.format('YYYY-MM-DD')
        };
        return this.calendarEventsInRangeQuery.watch(variables).valueChanges.pipe(map(results => results.data.eventsInRange));
      })
    );
  }
}
