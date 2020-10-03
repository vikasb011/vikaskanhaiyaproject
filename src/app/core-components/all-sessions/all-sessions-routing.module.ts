import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllSessionsComponent } from './all-sessions/all-sessions.component';


const routes: Routes = [
  {
    path: '',
    component: AllSessionsComponent,
    children: [
      { path: '', redirectTo: 'reg-session' },
      { path: 'reg-session', loadChildren: ()=> import('./all-sessions/components/reg-session/reg-session.module').then(m => m.RegSessionModule) },
      { path: 'audience-view/:user_id/:event_id/:session_id/:status', loadChildren: ()=> import('./all-sessions/components/audience-view/audience-view.module').then(m => m.AudienceViewModule) },
      { path: 'speaker-view', loadChildren: ()=> import('./all-sessions/components/speaker-view/speaker-view.module').then(m => m.SpeakerViewModule) },
      { path: 'sponsor-view', loadChildren: ()=> import('./all-sessions/components/sponsor-view/sponsor-view.module').then(m => m.SponsorViewModule) },
      { path: 'moderator-view', loadChildren: ()=> import('./all-sessions/components/moderator-view/moderator-view.module').then(m => m.ModeratorViewModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllSessionsRoutingModule { }
