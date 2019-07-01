import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as moment from 'moment';

import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `todays-events/${moment().format('YYYY-MM-DD')}`
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: fromContainers.CreateCalendarEventContainerComponent
  },
  {
    path: 'update/:eventId',
    pathMatch: 'full',
    component: fromContainers.UpdateCalendarEventContainerComponent
  },
  {
    path: 'update/:eventId',
    pathMatch: 'full',
    component: fromContainers.UpdateCalendarEventContainerComponent
  },
  {
    path: 'todays-events/:eventStart',
    pathMatch: 'full',
    component: fromContainers.TodaysEventsContainerComponent
  },
  {
    path: 'list',
    pathMatch: 'full',
    component: fromContainers.EventsListContainerComponent
  },
  {
    path: 'details/:eventId',
    pathMatch: 'full',
    component: fromContainers.CalendarEventDetailsContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarEventRoutingModule {}
