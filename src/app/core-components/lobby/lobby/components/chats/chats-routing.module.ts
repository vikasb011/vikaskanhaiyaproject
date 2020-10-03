import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatsComponent } from './chats/chats.component';
import { ChatGeneralComponent } from './chats/components/chat-general/chat-general.component';
import { ChatQuestionsComponent } from './chats/components/chat-questions/chat-questions.component';


const routes: Routes = [
  { 
    path: '', component: ChatsComponent,
    children:[
    {path: '', redirectTo: 'general'},
    {path: 'general', component: ChatGeneralComponent},
    { path: 'questions', component: ChatQuestionsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
