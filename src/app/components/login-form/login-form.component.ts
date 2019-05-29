import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user';
import {AuthenticationService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  user: User;
  loginForm = true;
  loginError = false;
  loading = false;

  @Output()
  loginSuccessful = new EventEmitter<boolean>();
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  doLogin(form: any, valid: any): void  {

    if (valid) {
      this.loginError = false;
      this.loading = true;
      this.authService.login(this.user)
        .subscribe(response => {
            this.loading = false;
            this.loginSuccessful.emit(true);
          },
          error => {
            this.loading = false;
            this.loginError = true;
            this.loginSuccessful.emit(false)
          });
    }
  }
}
