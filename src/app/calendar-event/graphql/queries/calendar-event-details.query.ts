import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

import { CalendarEvent, CalendarEventDetailsQueryVariables } from '../../models/calendar-event.model';

export type CalendarEventDetailsReponse = {
  event: CalendarEvent;
};

@Injectable()
export class CalendarEventDetailsQuery extends Query<CalendarEventDetailsReponse, CalendarEventDetailsQueryVariables> {
  document = gql`
    query CalendarEventDetailsQuery($id: String!) {
      event(id: $id) {
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
        guests {
          _id
          name
          email
          attending
        }
      }
    }
  `;
}
