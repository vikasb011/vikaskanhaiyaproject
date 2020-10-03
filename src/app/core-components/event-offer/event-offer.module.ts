import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventOfferRoutingModule } from './event-offer-routing.module';
import { EventOfferComponent } from './event-offer/event-offer.component';


@NgModule({
  declarations: [EventOfferComponent],
  imports: [
    CommonModule,
    EventOfferRoutingModule
  ]
})
export class EventOfferModule { }
