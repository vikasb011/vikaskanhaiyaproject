import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import { ParticipantsModule } from '../@shared/modules/participants/participants.module';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    ParticipantsModule,
    CarouselModule
  ]
})
export class DashboardModule { }
