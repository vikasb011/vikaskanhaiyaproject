import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorViewComponent } from './sponsor-view.component';
import { DeactivateGuard } from 'src/app/guards/deactivate.guard';


const routes: Routes = [
  {
    path: '', component: SponsorViewComponent, canDeactivate:[DeactivateGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorViewRoutingModule { }
