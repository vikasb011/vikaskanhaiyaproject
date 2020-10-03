import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeakerViewComponent } from './speaker-view.component';
import { DeactivateGuard } from 'src/app/guards/deactivate.guard';


const routes: Routes = [
  {path: '', component: SpeakerViewComponent, canDeactivate:[DeactivateGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeakerViewRoutingModule { }
