import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitiatorsComponent } from './initiators.component';


const routes: Routes = [
  {path:'', component: InitiatorsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitiatorsRoutingModule { }
