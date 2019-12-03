import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GiftGivingComponent } from './gift-giving.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  { path: 'gift-giving', component: GiftGivingComponent }
];

@NgModule({
  declarations: [GiftGivingComponent, NavComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GiftGivingModule { }
