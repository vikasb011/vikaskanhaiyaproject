import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats/chats.component';
import { ChatQuestionsComponent } from './chats/components/chat-questions/chat-questions.component';
import { ChatGeneralComponent } from './chats/components/chat-general/chat-general.component';

@NgModule({
  declarations: [ChatsComponent, ChatGeneralComponent, ChatQuestionsComponent],
  imports: [
    CommonModule,
    ChatsRoutingModule
  ]
})
export class ChatsModule { }
