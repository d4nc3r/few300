import { createAction, props } from '@ngrx/store';
import { HolidayEntity } from '../reducers/holidays.reducer';

let fakeId = 1;

export const addHoliday = createAction(
  '[gift giving] holiday added',
  ({ name, date }: { name: string, date: string }) => ({
    payload: {
      id: 'T' + fakeId++,
      name,
      date
    } as HolidayEntity
  })
);

export const addHolidaySucceeded = createAction(
  '[gift giving] successfully added a holiday',
  props<{ payload: HolidayEntity, oldId: string }>()
);

export const addHolidayFailed = createAction(
  '[gift giving] failed to add holiday',
  props<{ payload: HolidayEntity, message: string }>()
);

export const loadHolidays = createAction(
  '[gift giving] load the holidays'
);

export const loadHolidaysSucceeded = createAction(
  '[gift giving] successfully loaded holidays',
  props<{ payload: HolidayEntity[] }>()
);

export const loadHolidaysFailed = createAction(
  '[gift giving] failed to load holidays',
  props<{ payload: string }>()
);
