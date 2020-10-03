import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardSessionRoutingModule } from './dashboard-session-routing.module';
import { DashboardSessionComponent } from './dashboard-session.component';


@NgModule({
  declarations: [DashboardSessionComponent],
  imports: [
    CommonModule,
    DashboardSessionRoutingModule
  ]
})
export class DashboardSessionModule { }
