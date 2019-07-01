export type EventStatus = 'UPCOMING' | 'STARTED' | 'COMPLETED';
export type AttendingStatus = 'GOING' | 'PENDING' | 'NOT_GOING';

export type Guest = {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly attending: AttendingStatus;
};

export type CalendarEvent = {
  readonly _id: string;
  readonly status: EventStatus;
  readonly eventStart: string;
  readonly startTime: string;
  readonly eventEnd: string;
  readonly endTime: string;
  readonly name: string;
  readonly description?: string;
  readonly location?: string;
  readonly recurring?: boolean;
  readonly guests?: Guest[];
};

export type CalendarEventByStartDateMap = {
  [eventStart: string]: CalendarEvent[];
};

export type CalendarEventDetailsQueryVariables = {
  readonly id: string;
};

export type CalendarEventRangeQueryVariables = {
  readonly start: string;
  readonly end: string;
};

export type CreateCalendarEventMutationVariables = {
  readonly event: CalendarEvent;
};

export type UpdateCalendarEventMutationVariables = {
  readonly id: string;
  readonly event: CalendarEvent;
};
