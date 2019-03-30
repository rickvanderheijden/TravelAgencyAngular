import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../models/user';
import {AuthenticationService} from './auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  auth: User;
  loginForm = true;
  registerForm = false;
  registerError = false;
  loginError = false;
  loading = false;
  passwordConfirm: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.auth = new User(undefined);
  }

  register() {
    this.loginForm = false;
    this.registerForm = true;
  }

  doLogin(form: any, valid: any): void  {

    if (valid) {
      this.loginError = false;
      this.loading = true;
      this.authService.login(this.auth)
        .subscribe(response => {
            this.loading = false;
            this.router.navigate(['/']);
          },
          error => {
            this.loading = false;
            this.loginError = true;
          });
    }
  }

  doRegister(form: any, valid: boolean) {
    if ( valid ) {
      this.authService.register(this.auth).subscribe(
        response => {
          console.log(response);
          if (response === true) {
            this.toastr.success('Account succesvol aangemaakt', 'Gelukt!');
            this.auth = new User(undefined);
            this.login();
          } else {
            this.toastr.error('Fout', 'Registreren niet gelukt');
          }
        }
      )
    }
  }

  login() {
    this.loginForm = true;
    this.registerForm = false;
  }
}
