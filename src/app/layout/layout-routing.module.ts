import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  { path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      {path: 'dashboard', loadChildren: ()=> import('../core-components/dashboard/dashboard.module').then(m => m.DashboardModule)},
      {path: 'dashboard-session', loadChildren: ()=> import('../core-components/dashboard-session/dashboard-session.module').then(m => m.DashboardSessionModule)},
      {path: 'all-sessions', loadChildren: ()=> import('../core-components/all-sessions/all-sessions.module').then(m => m.AllSessionsModule)},
      {path: 'event-offer', loadChildren: ()=> import('../core-components/event-offer/event-offer.module').then(m => m.EventOfferModule)},
      {path: 'join-event', loadChildren: ()=> import('../core-components/join-event/join-event.module').then(m => m.JoinEventModule)},
      {path: 'sponsor', loadChildren: ()=> import('../core-components/sponsor/sponsor.module').then(m => m.SponsorModule)},
      {path: 'sponsor-detail/:id', loadChildren: ()=> import('../core-components/sponsor-detail/sponsor-detail.module').then(m => m.SponsorDetailModule)},
      {path: 'leads', loadChildren: ()=> import('../core-components/ssponsor/ssponsor.module').then(m => m.SsponsorModule)},
      {path: 'reception', loadChildren: ()=> import('../core-components/reception/reception.module').then(m => m.ReceptionModule)},
      {path: 'conference', loadChildren: ()=> import('../core-components/conference/conference.module').then(m => m.ConferenceModule)},
      {path: 'meeting', loadChildren: ()=> import('../core-components/meeting/meeting.module').then(m => m.MeetingModule)},
      {path: 'event', loadChildren:()=> import('../core-components/event/event.module').then(m => m.EventModule)},
      //{path: 'live', loadChildren:()=> import('../core-components/live/live.module').then(m => m.LiveModule)},
      {path : 'group', loadChildren:()=> import('../core-components/group/group.module').then(m => m.GroupModule)},
      {path : 'lobby', loadChildren:()=> import('../core-components/lobby/lobby.module').then(m => m.LobbyModule)},

      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
