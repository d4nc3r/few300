import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import * as holidaysActions from '../actions/holidays.actions';
import { HolidayEntity } from '../reducers/holidays.reducer';

@Injectable()
export class HolidaysEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }

  // turn loadHolidays into loadHolidaysSucceeded
  loadTheHolidays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.loadHolidays),
      // adding the type in line 21 does NOT do any verification, it just gives intellisense
      switchMap(() => this.http.get<GetHolidaysResponse>(`${environment.rootApiUrl}/holidays`)
        .pipe(
          map(response => response.holidays),
          map(holidays => holidaysActions.loadHolidaysSucceeded({ payload: holidays }))
        )
      )
    ), { dispatch: true }
  );

  saveHoliday$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.addHoliday),
      switchMap(originalAction => this.http.post<HolidayEntity>(`${environment.rootApiUrl}/holidays`, {
        name: originalAction.payload.name,
        date: originalAction.payload.date
      })
        .pipe(
          map(newHoliday => holidaysActions.addHolidaySucceeded({ payload: newHoliday, oldId: originalAction.payload.id })),
          catchError(err => of(holidaysActions.addHolidayFailed({ payload: originalAction.payload, message: 'something bad happened' })))
        )
      )
    ), { dispatch: true }
  );
}

interface GetHolidaysResponse {
  holidays: HolidayEntity[];
}
