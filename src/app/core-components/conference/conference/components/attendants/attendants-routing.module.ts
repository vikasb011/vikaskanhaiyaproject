import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendantsComponent } from './attendants.component';


const routes: Routes = [
  {
    path: '', 
    component: AttendantsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendantsRoutingModule { }
