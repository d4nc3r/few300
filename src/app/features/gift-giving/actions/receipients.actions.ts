import { createAction, props } from '@ngrx/store';
import { RecipientsEntity } from '../reducers/recipients.reducer';

let currentId = 1;

export const loadRecipients = createAction(
  '[gift giving] load recipients'
);

export const loadRecipientsSucceeded = createAction(
  '[gift giving] successfully loaded recipients',
  props<{ payload: RecipientsEntity[] }>()
);

export const addRecipient = createAction(
  '[gift giving] recipient added',
  ({ name, email, selectedHolidayIds }: { name: string; email: string; selectedHolidayIds: string[] }) => ({
    payload: {
      id: 'T' + currentId++,
      name,
      email,
      selectedHolidayIds
    }
  })
);

export const addRecipientSucceeded = createAction(
  '[gift giving] successfully added a recipient',
  props<{ payload: RecipientsEntity, oldId: string }>()
);

export const addRecipientFailed = createAction(
  '[gift giving] failed to add recipient',
  props<{ payload: RecipientsEntity, message: string }>()
);

export const removeHolidayFromRecipient = createAction(
  '[gift giving] removed holiday from recipient',
  props<{ recipientId, holidayId }>()
);
