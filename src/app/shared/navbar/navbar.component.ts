import { Component, AfterViewChecked } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../auth/auth.service';
import {User} from '../../../models/user';
import * as $ from 'jquery';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements AfterViewChecked {

    toggleClass = 'ft-maximize';
    placement = 'bottom-right';
    public isCollapsed = true;
    loggedIn = false;
    user: User = null;


  constructor(private authService: AuthenticationService) {
    this.authService.authenticationState.subscribe(response => {
      if (response === true) {
        this.authService.getLoggedInUser().subscribe(
          user => {
            this.user = new User(user);
            this.loggedIn = true;
          }
        );
      }
    });
  }

  ngAfterViewChecked() {

    }

    ToggleClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        } else {
          this.toggleClass = 'ft-maximize'
        }
    }

  logout() {
    this.authService.logout();
    this.loggedIn = false;
    this.user = null;
  }

  reloadHomePage() {
    if (window.location.href == 'http://localhost:4200/') {
      window.location.reload();
    } else {
      window.location.href = '/';
    }
  }
}
