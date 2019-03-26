import { Component } from '@angular/core';
import {AuthenticationService} from './auth/auth.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.authenticationState.subscribe(next => {
     if (next) {
       this.router.navigate(['/']);

     }
    });
  }


}
