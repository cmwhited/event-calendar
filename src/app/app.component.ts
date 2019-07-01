import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get header(): string {
    return 'Event Calendar';
  }
  get today(): string {
    return moment().format('YYYY-MM-DD');
  }
}
