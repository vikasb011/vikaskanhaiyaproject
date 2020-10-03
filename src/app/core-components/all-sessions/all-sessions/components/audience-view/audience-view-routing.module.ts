import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudienceViewComponent } from './audience-view.component';
import { DeactivateGuard } from 'src/app/guards/deactivate.guard';


const routes: Routes = [
  {path: '', component: AudienceViewComponent, canDeactivate:[DeactivateGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudienceViewRoutingModule { }
