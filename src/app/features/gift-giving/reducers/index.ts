import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHolidays from './holidays.reducer';
import * as fromHolidayModels from '../models/holidays';
import * as fromHolidayListControl from './holiday-list-controls.reducer';
import * as fromHolidayListControlModels from '../models/list-controls';

export const featureName = 'giftGivingFeature';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
  holidayListControls: fromHolidayListControl.HolidayListControlState;
}

export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer,
  holidayListControls: fromHolidayListControl.reducer
};

// Selectors

// 1. Feature Selector
const selectGiftFeature = createFeatureSelector<GiftGivingState>(featureName);

// 2. Feature per branch
const selectHolidaysBranch = createSelector(selectGiftFeature, g => g.holidays);
const selectHolidayListControlsBranch = createSelector(selectGiftFeature, g => g.holidayListControls);

// 3. Helpers
const { selectAll: selectHolidaysArray } = fromHolidays.adapter.getSelectors(selectHolidaysBranch);
// selectIds - gets the ids
// selectEntities - gets the entities
// selectTotal - gets number of entities
// selectAll - gets an array of the entities

// 4. For the Components
// 4a. We need one taht returns a holiday model
export const selectHolidayModel = createSelector(selectHolidaysArray,
  (holidays) => {
    return {
      holidays // easy for now, they are the same
    } as fromHolidayModels.HolidaysModel;
  });

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
