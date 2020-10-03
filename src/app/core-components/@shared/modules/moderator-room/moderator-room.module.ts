import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorRoomComponent } from './moderator-room.component';

import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule} from 'videogular2/compiled/buffering';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VgStreamingModule } from 'videogular2/compiled/streaming';


@NgModule({
  declarations: [ModeratorRoomComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule
  ],
  exports: [ModeratorRoomComponent]
})
export class ModeratorRoomModule { }
