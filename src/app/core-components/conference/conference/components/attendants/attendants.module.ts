import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendantsRoutingModule } from './attendants-routing.module';
import { AttendantsComponent } from './attendants.component';


@NgModule({
  declarations: [AttendantsComponent],
  imports: [
    CommonModule,
    AttendantsRoutingModule
  ]
})
export class AttendantsModule { }
