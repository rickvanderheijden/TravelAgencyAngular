import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Travelgroup} from '../../../../models/travelgroup';
import {TravelGroupService} from '../../../services/travelgroup.service';
import {User} from '../../../../models/user';
import {UserService} from '../../../services/user.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent implements OnInit {
  groupCreateForm: FormGroup;
  travelgroup: Travelgroup;
  loading = false;

  userId;
  masterUser: User;

  users: Array<User>;
  user: User;

  constructor(
    private travelGroupService: TravelGroupService,
    private userService: UserService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute) {
    this.travelgroup = new Travelgroup();
    this.users = new Array<User>();
  }

  ngOnInit() {
    this.loading = true;
    this.setForm();
    this.userId = this.route.snapshot.params.id;
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response;
      }
    );
    this.masterUser = new User(JSON.parse(sessionStorage.getItem('currentUser')));
    this.travelgroup.users.push(this.masterUser)
    this.loading = false;
  }

  setForm() {
    this.groupCreateForm = new FormGroup({
      name: new FormControl(this.travelgroup.name, [Validators.minLength(4), Validators.required])
    });
    this.travelgroup.users = new Array<User>();
  }

  submitForm() {
    this.travelgroup.masterId = this.userId;
    if (this.travelgroup) {
      this.travelGroupService.createTravelGroup(this.travelgroup).subscribe(
        (response: any) => {
        console.log(response);
      });
const self = this
      this.travelgroup.users.forEach(function (user) {
        self.travelGroupService.addUser(self.travelgroup, user.id).subscribe()
      })
      // this.back()
    }
  }

  back() {
    this.location.back();
  }

  addUser(userId: number) {

    this.user = this.users.find(user => user.id === userId);
    if (this.travelgroup.users.find(user => user.id === this.user.id)) {
      console.log('User already added');
    } else {
      this.travelgroup.users.push(this.user);
      console.log('User added');
    }
  }
}
