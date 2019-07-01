import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

import { CalendarEvent } from '../../models/calendar-event.model';

type CalendarEventsQueryResponse = {
  events: CalendarEvent[];
};

@Injectable()
export class CalendarEventsQuery extends Query<CalendarEventsQueryResponse> {
  document = gql`
    query CalendarEventsQuery {
      events {
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
