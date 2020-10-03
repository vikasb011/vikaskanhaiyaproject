import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorViewRoutingModule } from './sponsor-view-routing.module';
import { SponsorViewComponent } from './sponsor-view.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';


@NgModule({
  declarations: [SponsorViewComponent],
  imports: [
    CommonModule,
    SponsorViewRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SponsorViewModule { }
