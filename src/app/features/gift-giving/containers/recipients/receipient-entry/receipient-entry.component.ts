import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-receipient-entry',
  templateUrl: './receipient-entry.component.html',
  styleUrls: ['./receipient-entry.component.scss']
})
export class ReceipientEntryComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: 'Jamie',
      email: '',
      holidayIds: []
    });
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.form.value);
  }

}
