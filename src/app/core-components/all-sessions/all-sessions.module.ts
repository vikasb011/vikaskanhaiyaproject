import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllSessionsRoutingModule } from './all-sessions-routing.module';
import { AllSessionsComponent } from './all-sessions/all-sessions.component';
import { ParticipantsModule } from '../@shared/modules/participants/participants.module';


@NgModule({
  declarations: [AllSessionsComponent],
  imports: [
    CommonModule,
    AllSessionsRoutingModule,
    ParticipantsModule
  ]
})
export class AllSessionsModule { }
