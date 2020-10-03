import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegSessionComponent } from './reg-session.component';


const routes: Routes = [
  {path: '', component: RegSessionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegSessionRoutingModule { }
