import { Component, OnInit, Input } from '@angular/core';
import { RecipientListModel } from '../../../models';

@Component({
  selector: 'app-receipient-list',
  templateUrl: './receipient-list.component.html',
  styleUrls: ['./receipient-list.component.scss']
})
export class ReceipientListComponent implements OnInit {
  @Input() model: RecipientListModel[];

  constructor() { }

  ngOnInit() {
  }

}
