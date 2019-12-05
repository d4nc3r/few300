import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { GiftGivingComponent } from './gift-giving.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { RecipientsComponent } from './containers/recipients/recipients.component';
import { HolidaysComponent } from './containers/holidays/holidays.component';
import { HolidayEntryComponent } from './containers/holidays/holiday-entry/holiday-entry.component';
import { HolidayListComponent } from './containers/holidays/holiday-list/holiday-list.component';
import { featureName, reducers } from './reducers';
import { HolidayListControlsComponent } from './containers/holidays/holiday-list-controls/holiday-list-controls.component';
import { ReceipientEntryComponent } from './containers/recipients/receipient-entry/receipient-entry.component';
import { ReceipientListComponent } from './containers/recipients/receipient-list/receipient-list.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects/app.effects';
import { HolidaysEffects } from './effects/holidays.effects';

const routes: Routes = [
  {
    path: 'gift-giving',
    component: GiftGivingComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'recipients', component: RecipientsComponent },
      { path: 'holidays', component: HolidaysComponent },
    ]
  }
];

@NgModule({
  declarations: [
    GiftGivingComponent,
    NavComponent,
    DashboardComponent,
    RecipientsComponent,
    HolidaysComponent,
    HolidayEntryComponent,
    HolidayListComponent,
    HolidayListControlsComponent,
    ReceipientEntryComponent,
    ReceipientListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([AppEffects, HolidaysEffects])
  ]
})
export class GiftGivingModule { }
