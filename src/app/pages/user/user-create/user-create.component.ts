import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../models/user';
import {Authority} from '../../../../models/authority';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userCreateForm: FormGroup;
  loading = false;
  user: User;
  authorities: Array<Authority>;
  authority: Authority;
  password: String;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.user = new User();
    this.userService.getAuthorities().subscribe(
      (authoritiesResponse: Array<any>) => {
        this.authorities = new Array<Authority>();
        for (const auth of authoritiesResponse) {
          this.authorities.push(new Authority(auth));
        }
        this.setForm();
      }
    )
  }

  ngOnInit() {
  }

  setForm() {
    this.userCreateForm = this.formBuilder.group({
      username: this.formBuilder.control(this.user.username, [Validators.minLength(4), Validators.required]),
      firstname: this.formBuilder.control(this.user.firstname),
      lastname: this.formBuilder.control(this.user.lastname),
      emailAddress: this.formBuilder.control(this.user.emailAddress, [Validators.minLength(6), Validators.email, Validators.required]),
      password: this.formBuilder.control([Validators.minLength(4)]),
      authorities: this.formBuilder.control(this.authority)

    });
  }

  submitForm() {
    this.password = this.user.password;
    this.user = new User(this.userCreateForm.value);
    this.user.authorities = new Array<Authority>();

    for ( const authority of this.authorities) {
      if (authority.id === this.authority) {
        this.user.addAuthority(authority);
      }
    }
    this.user.password = this.password
    if (this.userCreateForm.valid) {
        this.userService.createUser(this.user).subscribe(
          (response: any) => {
            this.router.navigate(['/user']);
          }
        )
    }
  }

  back() {
    this.router.navigate(['/user']);
  }
}
