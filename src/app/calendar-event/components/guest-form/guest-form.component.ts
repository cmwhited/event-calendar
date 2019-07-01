import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestFormComponent {
  private _guestFormGroup: FormGroup;
  private _attendingStatuses: string[];

  @Input() set guestFormGroup(fg: FormGroup) {
    this._guestFormGroup = fg;
  }
  get guestFormGroup(): FormGroup {
    return this._guestFormGroup;
  }

  @Input() set attendingStatuses(statuses: string[]) {
    this._attendingStatuses = statuses;
  }
  get attendingStatuses(): string[] {
    return this._attendingStatuses;
  }
}
