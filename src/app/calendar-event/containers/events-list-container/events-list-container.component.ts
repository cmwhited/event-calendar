import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CalendarEvent, CalendarEventByStartDateMap } from '../../models';
import { CalendarEventsQuery } from '../../graphql';

@Component({
  selector: 'app-events-list-container',
  templateUrl: './events-list-container.component.html',
  styleUrls: ['./events-list-container.component.scss']
})
export class EventsListContainerComponent implements OnInit {
  calendarEventsMap$: Observable<CalendarEventByStartDateMap>;

  constructor(private readonly calendarEventsQuery: CalendarEventsQuery) {}

  ngOnInit() {
    this.calendarEventsMap$ = this.calendarEventsQuery.watch().valueChanges.pipe(
      map(results => results.data.events),
      map((events: CalendarEvent[]) =>
        events.reduce((currEventMap, event: CalendarEvent) => {
          const eventStart: string = event.eventStart;
          const eventsOnDate: CalendarEvent[] = events.filter((evt: CalendarEvent): boolean => evt.eventStart === eventStart);
          return {
            ...currEventMap,
            [eventStart]: [...eventsOnDate]
          };
        }, {})
      )
    );
  }
}
