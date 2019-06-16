import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if ( this.auth.loggedIn()) {
        return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }

  }
}
