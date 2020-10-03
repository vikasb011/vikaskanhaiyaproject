import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudienceLoginRoutingModule } from './audience-login-routing.module';
import { AudienceLoginComponent } from './audience-login/audience-login.component';
import { ReactiveFormsModule, FormsModule,} from '@angular/forms';


@NgModule({
  declarations: [AudienceLoginComponent],
  imports: [
    CommonModule,
    AudienceLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AudienceLoginModule { }
