import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiseHandComponent } from './rise-hand.component';
import { RiseHandRoutingModule } from './rise-hand-routing.module';

@NgModule({
  declarations: [RiseHandComponent],
  imports: [
    CommonModule,
    RiseHandRoutingModule
  ]
})
export class RiseHandModule { }
