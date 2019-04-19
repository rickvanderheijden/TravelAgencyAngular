import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../models/user';
import {Authority} from '../../../../models/authority';
import {UserService} from '../../../services/user.service';

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

  constructor(private userService: UserService) {
    this.user = new User();
    this.userService.getAuthorities().subscribe(
      (authoritiesResponse: Array<any>) => {
        this.authorities = new Array<Authority>();
        for (const auth of authoritiesResponse) {
          this.authorities.push(new Authority(auth));
        }
        console.log(this.authorities);
        this.setForm();
      }
    )
  }

  ngOnInit() {
  }

  setForm() {
    this.userCreateForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.minLength(4), Validators.required]),
      firstname: new FormControl(this.user.firstname),
      lastname: new FormControl(this.user.lastname),
      emailAddress: new FormControl(this.user.emailAddress, [Validators.minLength(6), Validators.email, Validators.required]),
      password: new FormControl([Validators.minLength(5)]),
      authorities: new FormControl(this.authority)

    });
  }

  submitForm(userCreateForm: FormGroup) {
    if (this.userCreateForm.valid) {
        this.userService.createUser(this.user).subscribe(
          (response: any) => {
            console.log(response);
          }
        )
    }
  }

  back() {

  }
}
