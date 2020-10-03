import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';


const routes: Routes = [
  {
    path: '',
   component: LobbyComponent,
    children:[
      {path: '', redirectTo: 'attendees'},
      {path: 'attendees', loadChildren: ()=> import('./lobby/components/attendees/attendees.module').then(m => m.AttendeesModule)},
      {path: 'session', loadChildren: ()=> import('./lobby/components/session/session.module').then(m => m.SessionModule)},
      {path: 'chats', loadChildren: ()=> import('./lobby/components/chats/chats.module').then(m => m.ChatsModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule { }
