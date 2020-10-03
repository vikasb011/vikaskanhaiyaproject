import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionRoomComponent } from './session-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule} from 'videogular2/compiled/buffering';
import { VgStreamingModule } from 'videogular2/compiled/streaming';


@NgModule({
  declarations: [SessionRoomComponent],
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
  exports: [SessionRoomComponent]
})
export class SessionRoomModule { }
