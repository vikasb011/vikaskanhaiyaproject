import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadChatRoomComponent } from './lead-chat-room.component';


const routes: Routes = [
  {
    path: '', component: LeadChatRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadChatRoomRoutingModule { }
