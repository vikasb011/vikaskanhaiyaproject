import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoomRoutingModule } from './chat-room-routing.module';
import { ChatRoomComponent } from './chat-room.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChattingRoomModule } from '../../../@shared/modules/chatting-room/chatting-room.module';


@NgModule({
  declarations: [ChatRoomComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChatRoomRoutingModule,
    ChattingRoomModule
  ]
})
export class ChatRoomModule { }
