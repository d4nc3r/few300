import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectErrorMessage } from '../../reducers';
import * as appActions from '../../actions/app.actions';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() errorMessage: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  clearMessage() {
    this.store.dispatch(appActions.clearAppError());
  }

}
