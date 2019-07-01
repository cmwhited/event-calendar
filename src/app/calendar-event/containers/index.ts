import { CreateCalendarEventContainerComponent } from './create-calendar-event-container/create-calendar-event-container.component';
import { UpdateCalendarEventContainerComponent } from './update-calendar-event-container/update-calendar-event-container.component';
import { TodaysEventsContainerComponent } from './todays-events-container/todays-events-container.component';
import { EventsListContainerComponent } from './events-list-container/events-list-container.component';
import { CalendarEventDetailsContainerComponent } from './calendar-event-details-container/calendar-event-details-container.component';

export const containers: any[] = [
  CreateCalendarEventContainerComponent,
  UpdateCalendarEventContainerComponent,
  TodaysEventsContainerComponent,
  EventsListContainerComponent,
  CalendarEventDetailsContainerComponent
];

export * from './create-calendar-event-container/create-calendar-event-container.component';
export * from './update-calendar-event-container/update-calendar-event-container.component';
export * from './todays-events-container/todays-events-container.component';
export * from './events-list-container/events-list-container.component';
export * from './calendar-event-details-container/calendar-event-details-container.component';
