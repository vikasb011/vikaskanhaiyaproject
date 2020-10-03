import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadChatRoomRoutingModule } from './lead-chat-room-routing.module';
import { LeadChatRoomComponent } from './lead-chat-room.component';
import { ChattingRoomModule } from '../../../../@shared/modules/chatting-room/chatting-room.module';


@NgModule({
  declarations: [LeadChatRoomComponent],
  imports: [
    CommonModule,
    LeadChatRoomRoutingModule,
    ChattingRoomModule   
  ]
})
export class LeadChatRoomModule { }
