import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorComponent } from './sponsor.component';


const routes: Routes = [
  {
    path: '',
    component: SponsorComponent,
    children: [
      { path: '', redirectTo: 'sponsor-list', pathMatch: 'prefix' },
      {path: 'sponsor-list', loadChildren: ()=> import('./components/sponsor-list/sponsor-list.module').then(m => m.SponsorListModule)},
      {path: 'sponsor-detail', loadChildren: ()=> import('./components/sponsor-detail/sponsor-detail.module').then(m => m.SponsorDetailModule)},
      {path: 'chat-room', loadChildren: ()=> import('./components/chat-room/chat-room.module').then(m => m.ChatRoomModule)},
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorRoutingModule { }
