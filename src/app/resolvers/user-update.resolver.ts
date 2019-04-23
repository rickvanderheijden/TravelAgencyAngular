import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../auth/auth.service';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserUpdateResolver implements Resolve<User> {

  constructor(private userService: UserService, private authService: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log('user update resolver');
    return this.userService.isAdmin().subscribe( isAdmin => {
      if (isAdmin) {
        return this.userService.getById(route.params.id);
      } else {
        return this.authService.getLoggedInUser();
      }
    });
  }
}
