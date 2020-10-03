import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventOfferComponent } from './event-offer/event-offer.component';


const routes: Routes = [
  {
    path: '', component: EventOfferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventOfferRoutingModule { }
