import { HolidayEntity } from '../reducers/holidays.reducer';
import { RecipientsEntity } from '../reducers/recipients.reducer';

export interface HolidayWithRecipients {
  holiday: HolidayEntity;
  recipients: RecipientsEntity[];
}
