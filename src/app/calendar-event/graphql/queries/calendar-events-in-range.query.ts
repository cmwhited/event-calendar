import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

import { CalendarEvent, CalendarEventRangeQueryVariables } from '../../models/calendar-event.model';

type EventsInRangeResponse = {
  eventsInRange: CalendarEvent[];
};

@Injectable()
export class CalendarEventsInRangeQuery extends Query<EventsInRangeResponse, CalendarEventRangeQueryVariables> {
  document = gql`
    query CalendarEventsInRangeQuery($start: String!, $end: String!) {
      eventsInRange(start: $start, end: $end) {
        _id
        status
        eventStart
        startTime
        eventEnd
        endTime
        name
        description
        location
        recurring
      }
    }
  `;
}
