import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HolidaysModel, ListControlsModel } from '../../models';
import { selectHolidayModel, GiftGivingState, selectHolidayListControls } from '../../reducers';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss'],
})
export class HolidaysComponent implements OnInit {
  holidayModel$: Observable<HolidaysModel>;
  holidayListControlsModel$: Observable<ListControlsModel>;

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.holidayModel$ = this.store.select(selectHolidayModel);
    this.holidayListControlsModel$ = this.store.select(selectHolidayListControls);
  }

}
