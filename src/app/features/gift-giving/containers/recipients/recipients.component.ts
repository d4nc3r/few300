import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GiftGivingState, selectHolidays, selectRecipients } from '../../reducers';
import { HolidayListItem, RecipientListModel } from '../../models';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss']
})
export class RecipientsComponent implements OnInit {
  holidays$: Observable<HolidayListItem[]>;
  recipients$: Observable<RecipientListModel[]>;

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.holidays$ = this.store.select(selectHolidays);
    this.recipients$ = this.store.select(selectRecipients);
  }

}
