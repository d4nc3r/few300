import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { GiftGivingState } from '../../../reducers';
import * as holidaysActions from '../../../actions/holidays.actions';

@Component({
  selector: 'app-holiday-entry',
  templateUrl: './holiday-entry.component.html',
  styleUrls: ['./holiday-entry.component.scss']
})
export class HolidayEntryComponent implements OnInit {

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
  }

  addHoliday(nameEl: HTMLInputElement, dateEl: HTMLInputElement) {
    const name = nameEl.value;
    const date = dateEl.valueAsDate.toISOString();
    const momentDate = moment.utc(date).toISOString();

    // reset teh form
    nameEl.value = '';
    dateEl.valueAsDate = new Date();
    nameEl.focus();

    // dispatch to the store
    this.store.dispatch(holidaysActions.addHoliday({ name, date }));
  }

}
