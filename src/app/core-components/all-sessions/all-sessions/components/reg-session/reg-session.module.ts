import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegSessionRoutingModule } from './reg-session-routing.module';
import { RegSessionComponent } from './reg-session.component';
import { ParticipantsModule } from '../../../../@shared/modules/participants/participants.module';


@NgModule({
  declarations: [RegSessionComponent],
  imports: [
    CommonModule,
    RegSessionRoutingModule,
    ParticipantsModule
  ]
})
export class RegSessionModule { }
