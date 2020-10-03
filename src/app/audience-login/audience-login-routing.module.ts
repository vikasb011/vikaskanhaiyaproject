import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudienceLoginComponent } from './audience-login/audience-login.component';


const routes: Routes = [
  {
    path: '',
    component : AudienceLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudienceLoginRoutingModule { }
