import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, ValidatorFn } from '@angular/forms';
import { HolidayListItem } from '../../../models';
import * as actions from '../../../actions/receipients.actions';
import { GiftGivingState } from '../../../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-receipient-entry',
  templateUrl: './receipient-entry.component.html',
  styleUrls: ['./receipient-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceipientEntryComponent implements OnInit {
  @Input() holidays: HolidayListItem[];
  form: FormGroup;
  holidaysArray: FormArray;
  name: FormControl;
  email: FormControl;
  shouldShowErrors = false;

  constructor(private formBuilder: FormBuilder, private store: Store<GiftGivingState>) {
    this.holidaysArray = new FormArray([], minNumberOfSelectedCheckboxes(1));
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.email = new FormControl('', Validators.email);

    this.form = formBuilder.group({
      name: this.name,
      email: this.email,
      holidays: this.holidaysArray
    });
  }

  ngOnInit() {
    this.createCheckboxes();
  }

  createCheckboxes() {
    this.holidays.forEach(() => {
      const control = new FormControl();
      (this.holidaysArray).push(control);
    });
  }

  submit(focusOnSubmit: HTMLInputElement) {
    if (this.form.valid) {
      const selectedHolidayIds = this.form.value.holidays
        .map((v, i) => v ? this.holidays[i].id : null)
        .filter(v => !!v);
      const name = this.form.value.name;
      const email = this.form.value.email;

      this.shouldShowErrors = false;
      focusOnSubmit.focus();
      this.form.reset();

      this.store.dispatch(actions.addRecipient({ name, email, selectedHolidayIds }));
    } else {
      this.shouldShowErrors = true;
    }

  }

  hasErrors(controlName: string) {
    const control = this.form.get(controlName);
    return control.invalid &&
      (control.dirty || control.touched) &&
      this.shouldShowErrors;
  }

  displayArrayError(arrayName: string, error: string) {
    const array = this.form.get(arrayName);
    return array.invalid && this.shouldShowErrors;
  }

  displayError(controlName: string, error: string) {
    const control = this.form.get(controlName);
    return control.invalid &&
      (control.dirty || control.touched) &&
      control.errors[error] &&
      this.shouldShowErrors;
  }

}

function minNumberOfSelectedCheckboxes(min: number) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const numberSelected = formArray.controls
      .map(c => c.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);
    return numberSelected >= min ? null : { required: true, needed: min };
  };

  return validator;
}
