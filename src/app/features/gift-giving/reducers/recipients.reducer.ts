import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';

import * as actions from '../actions/receipients.actions';

export interface RecipientsEntity {
  id: string;
  name: string;
  email: string;
  selectedHolidayIds: string[];
}

export interface RecipientsState extends EntityState<RecipientsEntity> {

}

export const adapter = createEntityAdapter<RecipientsEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.loadRecipientsSucceeded, (state, action) => adapter.addAll(action.payload, state)),
  on(actions.addRecipient, (state, action) => adapter.addOne(action.payload, state)),
  on(actions.addRecipientSucceeded, (state, action) => {
    const oldState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.payload, oldState);
  }),
  on(actions.removeHolidayFromRecipient, (state, action) => {
    const recipient = state.entities[action.recipientId];
    const updatedHolidayList = [...recipient.selectedHolidayIds.filter(h => h !== action.holidayId)];

    // update the recipient using the adapter
    return adapter.updateOne({
      id: action.recipientId,
      changes: { selectedHolidayIds: updatedHolidayList }
    }, state);
  }));

export function reducer(state: RecipientsState = initialState, action: Action) {
  return reducerFunction(state, action);
}



