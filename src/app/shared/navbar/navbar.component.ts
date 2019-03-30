import { Component, AfterViewChecked } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
    loggedIn = false;
    user: User = null;


  constructor(private authService: AuthenticationService) {
    this.authService.authenticationState.subscribe(response => {
      if (response) {
        this.authService.getLoggedInUser().subscribe(
          user => {
            this.user = new User(user);
            this.loggedIn = true;
          }
        );
      }
    });
    // this.authService.loggedInUser.subscribe(user => {
    //   console.log(user);
    //     if ( user === null ) {
    //       console.log(this.authService.isAuthenticated());
    //       this.loggedIn = false;
    //     } else {
    //       this.loggedIn = true;
    //       this.user = user;
    //     }
    //   }
    // )
  }

  ngAfterViewChecked() {
    this.authService.getLoggedInUser();

        // setTimeout(() => {
        //     var wrapperDiv = document.getElementsByClassName("wrapper")[0];
        //     var dir = wrapperDiv.getAttribute("dir");
        //     if (dir === 'rtl') {
        //         this.placement = 'bottom-left';
        //     }
        //     else if (dir === 'ltr') {
        //         this.placement = 'bottom-right';
        //     }
        // }, 3000);


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

}
