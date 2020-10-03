import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardSessionComponent } from './dashboard-session.component';


const routes: Routes = [
  {
    path: '', component: DashboardSessionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardSessionRoutingModule { }
