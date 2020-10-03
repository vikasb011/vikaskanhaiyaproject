import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorDetailComponent } from './sponsor-detail/sponsor-detail.component';


const routes: Routes = [
  {
    path: '',
    component: SponsorDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorDetailRoutingModule { }
