import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as appActions from '../../../actions/app.actions';
import * as holidaysActions from '../actions/holidays.actions';
import * as recipientActions from '../actions/receipients.actions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions) { }

  // turn app_started into loadHolidays
  loadHolidaysOnAppStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => holidaysActions.loadHolidays())
    )
  );

  loadRecipientsOnAppStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => recipientActions.loadRecipients())
    )
  );

  // turn addHolidayFailed into an application error
  addHolidayFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.addHolidayFailed),
      map(x => appActions.applicationError({ message: x.message, feature: 'Gift Giving' }))
    )
  );
}
