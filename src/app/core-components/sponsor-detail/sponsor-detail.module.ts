import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorDetailRoutingModule } from './sponsor-detail-routing.module';
import { SponsorDetailComponent } from './sponsor-detail/sponsor-detail.component';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule} from 'videogular2/compiled/buffering';
import { ChatboxModule } from '../@shared/modules/chatbox/chatbox.module';



@NgModule({
  declarations: [SponsorDetailComponent],
  imports: [
    CommonModule,
    SponsorDetailRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
    ChatboxModule

  ]
})
export class SponsorDetailModule { }
