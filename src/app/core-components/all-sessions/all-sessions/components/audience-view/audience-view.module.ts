import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudienceViewComponent } from './audience-view.component';
import { AudienceViewRoutingModule } from './audience-view-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SessionRoomModule } from '../../../../@shared/modules/session-room/session-room.module';



@NgModule({
  declarations: [AudienceViewComponent],
  imports: [
    CommonModule,
    AudienceViewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SessionRoomModule
  ]
})
export class AudienceViewModule { }
