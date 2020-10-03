import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakerViewRoutingModule } from './speaker-view-routing.module';
import { SpeakerViewComponent } from './speaker-view.component';
import { SpeakerRoomComponent } from './speaker-room/speaker-room.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SessionRoomModule } from '../../../../@shared/modules/session-room/session-room.module';


@NgModule({
  declarations: [SpeakerViewComponent, SpeakerRoomComponent],
  imports: [
    CommonModule,
    SpeakerViewRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SessionRoomModule
  ]
})
export class SpeakerViewModule { }
