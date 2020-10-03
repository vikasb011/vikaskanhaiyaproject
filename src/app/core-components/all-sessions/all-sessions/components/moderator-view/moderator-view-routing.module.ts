import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModeratorViewComponent } from './moderator-view.component';
import { DeactivateGuard } from 'src/app/guards/deactivate.guard';


const routes: Routes = [
  {path:'', component:ModeratorViewComponent, canDeactivate:[DeactivateGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeratorViewRoutingModule { }
