import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as holidaysActions from '../actions/holidays.actions';

export interface HolidayEntity {
  id: string;
  name: string;
  date: string;
}

export interface HolidayState extends EntityState<HolidayEntity> {

}

export const adapter = createEntityAdapter<HolidayEntity>();

// const initialState = adapter.getInitialState();
const initialState: HolidayState = {
  ids: ['1', '2', '3'],
  entities: {
    1: { id: '1', name: 'Christmas', date: new Date(2019, 11, 25).toISOString() },
    2: { id: '2', name: 'Hanukkah', date: new Date(2019, 11, 22).toISOString() },
    3: { id: '3', name: '4th of July', date: new Date(2020, 3, 4).toISOString() }
  }
};

const reducerFunction = createReducer(
  initialState,
  on(holidaysActions.addHoliday, (state, action) => adapter.addOne(action.payload, state))
);

export function reducer(state: HolidayState = initialState, action: Action) {
  return reducerFunction(state, action);
}
