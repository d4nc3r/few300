import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import * as recipientActions from '../actions/receipients.actions';
import { RecipientsEntity } from '../reducers/recipients.reducer';
import { of } from 'rxjs';

@Injectable()
export class RecipientsEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }

  loadRecipients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recipientActions.loadRecipients),
      switchMap(() => this.http.get<GetRecipientsResponse>(`${environment.rootApiUrl}/recipients`)
        .pipe(
          map(response => response.recipients.map<RecipientsEntity>(r => ({
            id: r.id,
            name: r.name,
            email: r.email,
            selectedHolidayIds: r.holidays
          }))),
          map(recipients => recipientActions.loadRecipientsSucceeded({ payload: recipients }))
        )
      )
    ), { dispatch: true }
  );

  addRecipient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recipientActions.addRecipient),
      switchMap((action) => this.http.post<PutRecipientResponse>(`${environment.rootApiUrl}/recipients`, {
        name: action.payload.name,
        email: action.payload.email
      })
        .pipe(
          map(response => recipientActions.addRecipientSucceeded({
            payload: {
              ...response,
              selectedHolidayIds: action.payload.selectedHolidayIds
            },
            oldId: action.payload.id
          }))
        )
      )
    ), { dispatch: true }
  );

  addRecipientHolidays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recipientActions.addRecipientSucceeded),
      switchMap((action) => this.http.put(`${environment.rootApiUrl}/recipients/${action.payload.id}/holidays`,
        action.payload.selectedHolidayIds)
        .pipe(
          catchError(err => of({ type: 'add failed', payload: err }))
        )
      )
    ), { dispatch: false }
  );
}

interface GetRecipientsResponse {
  recipients: {
    id: string;
    name: string;
    email: string;
    holidays: string[];
  }[];
}

interface PutRecipientResponse {
  id: string;
  name: string;
  email: string;
}
