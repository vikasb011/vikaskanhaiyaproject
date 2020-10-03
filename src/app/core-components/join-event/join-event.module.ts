import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinEventRoutingModule } from './join-event-routing.module';
import { JoinEventComponent } from './join-event/join-event.component';


@NgModule({
  declarations: [JoinEventComponent],
  imports: [
    CommonModule,
    JoinEventRoutingModule
  ]
})
export class JoinEventModule { }
