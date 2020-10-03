import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'prefix' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '', loadChildren:()=> import('./layout/layout.module').then(m => m.LayoutModule), canActivate:[AuthGuard]},
  { path: 'audienceLogin', loadChildren: () => import('./audience-login/audience-login.module').then(m => m.AudienceLoginModule) },
  // {path: '', loadChildren:()=> import('./layout/layout.module').then(m => m.LayoutModule)},
  { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 'useHash': true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
