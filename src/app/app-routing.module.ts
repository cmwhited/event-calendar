import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as moment from 'moment';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `calendar-events/todays-events/${moment().format('YYYY-MM-DD')}`
  },
  {
    path: 'calendar-events',
    loadChildren: () => import('./calendar-event/calendar-event.module').then(m => m.CalendarEventModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
