import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConferenceComponent } from './conference/conference.component';

const routes: Routes = [
  {
    path: '',
    component: ConferenceComponent,
    children: [
      { path: '', redirectTo: 'sessions' },
      { path: 'sessions', loadChildren: ()=> import('./conference/components/sessions/sessions.module').then(m => m.SessionsHandModule) },
      { path: 'risehand', loadChildren: ()=> import('./conference/components/rise-hand/rise-hand.module').then(m => m.RiseHandModule) },
      { path: 'attendants', loadChildren: ()=> import('./conference/components/attendants/attendants.module').then(m => m.AttendantsModule) },
      { path: 'chat', loadChildren: ()=> import('./conference/components/chat/chat.module').then(m => m.ChatModule) },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConferenceRoutingModule { }
