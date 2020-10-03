import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConferenceRoutingModule } from './conference-routing.module';
import { ConferenceComponent } from './conference/conference.component';

@NgModule({
  declarations: [ConferenceComponent,],
  imports: [
    CommonModule,
    ConferenceRoutingModule
  ]
})
export class ConferenceModule { }
