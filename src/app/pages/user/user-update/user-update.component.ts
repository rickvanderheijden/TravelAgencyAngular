import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import swal from 'sweetalert2';
import {User} from '../../../../models/user';
import {AuthenticationService} from '../../../auth/auth.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  userUpdateForm: FormGroup;
  loading = false;
  changePassword: boolean;
  userId: any;
  user: User;
  password: String;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.changePassword = false;

    this.userService.isAdmin().subscribe( isAdmin => {
      if (isAdmin) {
        return this.userService.getById(this.route.snapshot.params.id).subscribe((data: any) => {
          this.user = data;
          this.setForm();
          this.userId = route.snapshot.params.id;
        });
      } else {
        return this.authService.getLoggedInUser().subscribe((data: any) => {
          this.user = data;
          this.setForm();
          this.userId = route.snapshot.params.id;
        });
      }
    });
  }
  setForm() {
    this.userUpdateForm = this.formBuilder.group({
      username: this.formBuilder.control(this.user.username, [Validators.minLength(4), Validators.required]),
      firstName: this.formBuilder.control(this.user.firstName),
      lastName: this.formBuilder.control(this.user.lastName),
      emailAddress: this.formBuilder.control(this.user.emailAddress, [Validators.minLength(6), Validators.email, Validators.required]),
      password: this.formBuilder.control([Validators.minLength(5)]),
      password_repeat: this.formBuilder.control
    });
  }
  ngOnInit() {
  }

  submitForm(userUpdateForm) {
    const thiz = this;
    if (this.changePassword !== true) {
      this.user.password = null;
    }

    if (this.user.password !== userUpdateForm.value.password_repeat && this.changePassword === true) {
      swal('Error', 'De ingevulde wachtwoorden komen niet overeen.', 'error');
    } else {
      if (this.loading === false) {
        this.loading = true;
        this.password = this.user.password;
        this.user = new User(this.userUpdateForm.value);
        this.user.password = this.password;
        this.userService.updateUser(this.user)
          .subscribe(response => {
              swal({title: 'Gelukt', text: 'Gebruiker succesvol geupdate', type: 'success'}).then(function () {
                thiz.router.navigate(['/user/']);
              });
              this.loading = false;
            },
            error => {
              swal('Error', 'Er is iets fout gegaan', 'error');
              this.loading = false;
            });
      }
    }
  }

  toggleCheckbox(event) {
    this.changePassword = !this.changePassword;
  }

  back() {
    this.router.navigate(['/user/']);
  }
}
