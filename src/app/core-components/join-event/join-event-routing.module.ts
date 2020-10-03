import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinEventComponent } from './join-event/join-event.component';


const routes: Routes = [
  {
    path: '', component: JoinEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoinEventRoutingModule { }
