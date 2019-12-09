import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { GiftGivingState, selectHolidaysWithRecipientsSorted } from '../../reducers';
import { HolidayWithRecipients } from '../../models/dashboard';

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

}
