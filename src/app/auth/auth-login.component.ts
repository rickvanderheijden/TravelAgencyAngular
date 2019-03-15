import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../models/user';
import {AuthenticationService} from './auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  auth: User;
  loginForm = true;
  forgotPasswordForm = false;
  loginError = false;
  loading = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth = new User(undefined);
  }

  forgotPassword() {
    this.loginForm = false;
    this.forgotPasswordForm = true;
  }

  doLogin(form: any, valid: any): void  {

    if (valid) {
      this.loginError = false;
      this.loading = true;
      this.authService.login(this.auth)
        .subscribe(response => {
            this.loading = false;
            this.authService.getLoggedInUser().subscribe(response => {
              console.log(response);
            });
            this.router.navigate(['/']);
          },
          error => {
            this.loading = false;
            this.loginError = true;
          });
    }
  }

}
