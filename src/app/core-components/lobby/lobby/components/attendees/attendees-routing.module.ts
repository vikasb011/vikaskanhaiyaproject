import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendeesComponent } from './attendees/attendees.component';


const routes: Routes = [
  {path: '', component: AttendeesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendeesRoutingModule { }
