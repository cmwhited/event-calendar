import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

import { CalendarEvent, UpdateCalendarEventMutationVariables } from '../../models/calendar-event.model';

export type UpdateCalendarEventMutationResponse = {
  updateEvent: CalendarEvent;
};

@Injectable()
export class UpdateCalendarEventMutation extends Mutation<UpdateCalendarEventMutationResponse, UpdateCalendarEventMutationVariables> {
  document = gql`
    mutation UpdateCalendarEvent($id: String!, $event: CalendarEventInput!) {
      updateEvent(id: $id, event: $event) {
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
