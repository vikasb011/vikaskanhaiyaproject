import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorDetailRoutingModule } from './sponsor-detail-routing.module';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule} from 'videogular2/compiled/buffering';
import { SponsorDetailComponent } from './sponsor-detail.component';
import { ChatboxModule } from '../../../@shared/modules/chatbox/chatbox.module';



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
