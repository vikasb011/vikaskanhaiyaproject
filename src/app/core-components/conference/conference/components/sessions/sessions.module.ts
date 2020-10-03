import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsComponent } from './sessions.component';
import { SessionsRoutingModule } from './sessions-routing.module';

@NgModule({
  declarations: [SessionsComponent],
  imports: [
    CommonModule,
    SessionsRoutingModule
  ]
})
export class SessionsHandModule { }
