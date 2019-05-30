import { Component, AfterViewChecked } from '@angular/core';
import {AuthenticationService} from '../../auth/auth.service';
import {User} from '../../../models/user';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements AfterViewChecked {

    toggleClass = 'ft-maximize';
    placement = 'bottom-right';
    public isCollapsed = true;
    user: User = null;


  constructor(private authService: AuthenticationService) {
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

  loggedIn() {
    if (sessionStorage.getItem('currentUser')) {
      if (!this.user) {
        this.user = new User(JSON.parse(sessionStorage.getItem('currentUser')));
      }
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.reloadHomePage();
  }

  reloadHomePage() {
    if (window.location.href === 'http://localhost:4200/') {
      window.location.reload();
    } else {
      window.location.href = '/';
    }
  }
}
