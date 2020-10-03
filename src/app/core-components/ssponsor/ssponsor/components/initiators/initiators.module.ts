import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitiatorsRoutingModule } from './initiators-routing.module';
import { InitiatorsComponent } from './initiators.component';
import { ChatboxModule } from '../../../../@shared/modules/chatbox/chatbox.module';


@NgModule({
  declarations: [InitiatorsComponent],
  imports: [
    CommonModule,
    InitiatorsRoutingModule,
    ChatboxModule
  ]
})
export class InitiatorsModule { }
