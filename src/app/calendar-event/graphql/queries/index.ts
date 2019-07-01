import { CalendarEventDetailsQuery } from './calendar-event-details.query';
import { CalendarEventsInRangeQuery } from './calendar-events-in-range.query';
import { CalendarEventsQuery } from './calendar-events.query';

export const queries: any[] = [CalendarEventDetailsQuery, CalendarEventsInRangeQuery, CalendarEventsQuery];

export * from './calendar-event-details.query';
export * from './calendar-events-in-range.query';
export * from './calendar-events.query';
