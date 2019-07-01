import { CreateCalendarEventMutation } from './create-calendar-event.mutation';
import { UpdateCalendarEventMutation } from './update-calendar-event.mutation';
import { RemoveCalendarEventMutation } from './remove-calendar-event.mutation';

export const mutations: any[] = [CreateCalendarEventMutation, UpdateCalendarEventMutation, RemoveCalendarEventMutation];

export * from './create-calendar-event.mutation';
export * from './update-calendar-event.mutation';
export * from './remove-calendar-event.mutation';
