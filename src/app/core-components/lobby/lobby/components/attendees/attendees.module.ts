import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendeesRoutingModule } from './attendees-routing.module';
import { AttendeesComponent } from './attendees/attendees.component';
import { ParticipantsModule } from '../../../../@shared/modules/participants/participants.module';


@NgModule({
  declarations: [AttendeesComponent],
  imports: [
    CommonModule,
    AttendeesRoutingModule,
    ParticipantsModule
  ]
})
export class AttendeesModule { }
