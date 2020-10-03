import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AudienceViewComponent } from '../core-components/all-sessions/all-sessions/components/audience-view/audience-view.component';
import { SpeakerViewComponent } from '../core-components/all-sessions/all-sessions/components/speaker-view/speaker-view.component';
import { SponsorViewComponent } from '../core-components/all-sessions/all-sessions/components/sponsor-view/sponsor-view.component';
import { ModeratorViewComponent } from '../core-components/all-sessions/all-sessions/components/moderator-view/moderator-view.component';
@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line: max-line-length
export class DeactivateGuard implements CanDeactivate<AudienceViewComponent | SpeakerViewComponent | SponsorViewComponent | ModeratorViewComponent> {
  canDeactivate(): boolean {
return window.confirm('Are you sure to Navigate?');
  }


}
