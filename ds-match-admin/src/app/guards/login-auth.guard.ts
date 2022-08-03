import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = this.localStorage.retrieve('adminId');

    if (id) {
      if (state.url === '/') {
        this.router.navigateByUrl('/dashboard');
        return false;
      }
      else return true;
    }
    else {
      if (state.url === '/') return true;
      else {
        this.router.navigateByUrl('/');
        return false;
      }
    }

  }

}

