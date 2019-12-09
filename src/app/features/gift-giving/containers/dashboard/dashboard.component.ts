import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { GiftGivingState, selectHolidaysWithRecipientsSorted } from '../../reducers';
import { HolidayWithRecipients } from '../../models/dashboard';
import * as recipientsActions from '../../actions/receipients.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  holidaysWithRecipients$: Observable<HolidayWithRecipients[]>;

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.holidaysWithRecipients$ = this.store.select(selectHolidaysWithRecipientsSorted);
  }

  removeRecipient(recipientId: string, holidayId: string) {
    this.store.dispatch(recipientsActions.removeHolidayFromRecipient({ recipientId, holidayId }));
  }

}
