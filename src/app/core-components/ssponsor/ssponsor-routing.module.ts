import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SsponsorComponent } from './ssponsor/ssponsor.component';


const routes: Routes = [
  {
    path:'',
    component:SsponsorComponent,
    children: [
      { path: '', redirectTo: 'initiators', pathMatch: 'prefix' },
      {path: 'initiators', loadChildren: ()=> import('./ssponsor/components/initiators/initiators.module').then(m => m.InitiatorsModule)},
      {path: 'lead-chat-room', loadChildren: ()=> import('./ssponsor/components/lead-chat-room/lead-chat-room.module').then(m => m.LeadChatRoomModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SsponsorRoutingModule { }
