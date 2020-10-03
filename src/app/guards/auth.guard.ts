import { Injectable } from '@angular/core';
import { CanActivate,Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FetchDataService } from '../services/fetch-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  modules = [];
  constructor(private authServ: FetchDataService,
    private router: Router){
    }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(localStorage.getItem('menu-items')){
      return true;
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }
}