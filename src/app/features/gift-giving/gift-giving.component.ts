import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GiftGivingState, selectIsLoaded } from './reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gift-giving',
  templateUrl: './gift-giving.component.html',
  styleUrls: ['./gift-giving.component.scss']
})
export class GiftGivingComponent implements OnInit {
  isLoaded$: Observable<boolean>;

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.isLoaded$ = this.store.select(selectIsLoaded);
  }

}
