import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiseHandComponent } from './rise-hand.component';

const routes: Routes = [
  {
    path: '', 
    component: RiseHandComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiseHandRoutingModule { }
