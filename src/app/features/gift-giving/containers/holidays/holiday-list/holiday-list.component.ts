import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { HolidaysModel } from '../../../models';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // only do change detection if the parent pushes a new input
})
export class HolidayListComponent implements OnInit {
  @Input() model: HolidaysModel;

  constructor() { }

  ngOnInit() {
  }

}
