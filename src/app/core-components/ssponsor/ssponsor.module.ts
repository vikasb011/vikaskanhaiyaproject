import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SsponsorRoutingModule } from './ssponsor-routing.module';
import { SsponsorComponent } from './ssponsor/ssponsor.component';


@NgModule({
  declarations: [SsponsorComponent],
  imports: [
    CommonModule,
    SsponsorRoutingModule,
  ]
})
export class SsponsorModule { }
