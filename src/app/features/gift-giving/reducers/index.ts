import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as moment from 'moment';

import * as fromHolidays from './holidays.reducer';
import * as fromHolidayModels from '../models/holidays';
import * as fromHolidayListControl from './holiday-list-controls.reducer';
import * as fromRecipients from './recipients.reducer';
import * as fromRecipientsModel from '../models/recipients';
import * as fromHolidayListControlModels from '../models/list-controls';

export const featureName = 'giftGivingFeature';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
  holidayListControls: fromHolidayListControl.HolidayListControlState;
  recipients: fromRecipients.RecipientsState;
}

export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer,
  holidayListControls: fromHolidayListControl.reducer,
  recipients: fromRecipients.reducer
};

// Selectors

// 1. Feature Selector
const selectGiftFeature = createFeatureSelector<GiftGivingState>(featureName);

// 2. Feature per branch
const selectHolidaysBranch = createSelector(selectGiftFeature, g => g.holidays);
const selectHolidayListControlsBranch = createSelector(selectGiftFeature, g => g.holidayListControls);
const selectRecipientsBranch = createSelector(selectGiftFeature, g => g.recipients);

// 3. Helpers
const { selectAll: selectHolidaysArray, selectEntities: selectHolidaysEntities } = fromHolidays.adapter.getSelectors(selectHolidaysBranch);
const { selectAll: selectRecipientsArray } = fromRecipients.adapter.getSelectors(selectRecipientsBranch);

const selectShowAll = createSelector(
  selectHolidayListControlsBranch,
  b => b.showAll
);
const selectSortBy = createSelector(
  selectHolidayListControlsBranch,
  b => b.sortBy
);

// 4. For the Components
// 4a. We need one taht returns a holiday model
const selectHolidayModelRaw = createSelector(selectHolidaysArray,
  (holidays) => {
    return {
      holidays // easy for now, they are the same
    } as fromHolidayModels.HolidaysModel;
  });

const selectHolidayModelFiltered = createSelector(
  selectHolidayModelRaw,
  selectShowAll,
  (holidayModel, showAll) => {
    if (showAll) {
      return holidayModel;
    }
    return {
      holidays: holidayModel.holidays.filter(h => new Date(h.date) >= new Date())
    };
  }
);

const selectHolidayModelSorted = createSelector(
  selectHolidayModelFiltered,
  selectSortBy,
  (holidayModel, sortBy) => {
    let sortedHolidayModel;
    if (sortBy === 'date') {
      sortedHolidayModel = {
        holidays: [...holidayModel.holidays.sort((lhs, rhs) => {
          if (new Date(lhs.date) < new Date(rhs.date)) { return -1; }
          if (new Date(lhs.date) > new Date(rhs.date)) { return 1; }
          return 0;
        })]
      };
    } else if (sortBy === 'name') {
      sortedHolidayModel = {
        holidays: [...holidayModel.holidays.sort((lhs, rhs) => {
          if (lhs.name.toLocaleLowerCase() < rhs.name.toLocaleLowerCase()) { return -1; }
          if (lhs.name.toLocaleLowerCase() > rhs.name.toLocaleLowerCase()) { return 1; }
          return 0;
        })]
      };
    }

    return sortedHolidayModel;
  }
);

export const selectHolidayModel = createSelector(
  selectHolidayModelSorted,
  h => h
);

export const selectHolidays = createSelector(
  selectHolidayModelRaw,
  r => r.holidays // TODO: filter/sort?
);

export const selectHolidayListControls = createSelector(
  selectHolidayListControlsBranch,
  b => {
    return {
      showingAll: b.showAll,
      showingUpcoming: !b.showAll,
      sortingByDate: b.sortBy === 'date',
      sortingByName: b.sortBy === 'name'
    } as fromHolidayListControlModels.ListControlsModel;
  }
);

export const selectRecipients = createSelector(
  selectRecipientsArray,
  selectHolidaysEntities,
  (recipients, holidaysEntity) => {
    return recipients.map(recipient => {
      const holidays = recipient.selectedHolidayIds
        .map(id => holidaysEntity[id])
        .map(createHoliday);

      return {
        id: recipient.id,
        name: recipient.name,
        email: recipient.email,
        holidays
      } as fromRecipientsModel.RecipientListModel;
    });
  }
);

function createHoliday(holiday) {
  const date = moment(holiday.date).format('MMM D, YYYY');
  return {
    id: holiday.id,
    description: `${holiday.name} (${date})`
  };
}
