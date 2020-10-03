import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorListRoutingModule } from './sponsor-list-routing.module';
import { SponsorListComponent } from './sponsor-list.component';


@NgModule({
  declarations: [SponsorListComponent],
  imports: [
    CommonModule,
    SponsorListRoutingModule
  ]
})
export class SponsorListModule { }
