import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UiThemeModule } from '../ui-theme/ui-theme.module';
import { components } from './components';
import { containers } from './containers';
import { mutations, queries } from './graphql';
import { formBuilders } from './form-builders';
import { pipes } from './pipes';
import { CalendarEventRoutingModule } from './calendar-event-routing.module';

@NgModule({
  declarations: [...containers, ...components, ...pipes],
  imports: [CommonModule, ReactiveFormsModule, UiThemeModule, CalendarEventRoutingModule],
  providers: [...mutations, ...queries, ...formBuilders]
})
export class CalendarEventModule {}
