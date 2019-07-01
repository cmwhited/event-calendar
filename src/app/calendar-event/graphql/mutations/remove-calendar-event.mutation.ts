import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

import { CalendarEvent } from '../../models/calendar-event.model';

@Injectable()
export class RemoveCalendarEventMutation extends Mutation<CalendarEvent, string> {
  document = gql`
    mutation RemoveCalendarEvent($id: String!) {
      removeCalendarEvent(id: $id) {
        _id
        eventStart
        startTime
        eventEnd
        endTime
        name
        description
        location
        recurring
        createdAt
        updatedAt
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
