import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModeratorViewRoutingModule } from './moderator-view-routing.module';
import { ModeratorViewComponent } from './moderator-view.component';
import { ModeratorRoomModule } from '../../../../@shared/modules/moderator-room/moderator-room.module';


@NgModule({
  declarations: [ModeratorViewComponent],
  imports: [
    CommonModule,
    ModeratorViewRoutingModule,
    ModeratorRoomModule
  ]
})
export class ModeratorViewModule { }
