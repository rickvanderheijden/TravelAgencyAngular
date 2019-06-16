import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TravelGroup} from '../../../../models/travelGroup';
import {User} from '../../../../models/user';
import {TravelGroupService} from '../../../services/travelgroup.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-group-update',
  templateUrl: './group-update.component.html',
  styleUrls: ['./group-update.component.scss']
})
export class GroupUpdateComponent implements OnInit {
  groupUpdateForm: FormGroup;
  travelgroup: TravelGroup;
  allUsers: Array<User>;
  loading = false;
  user: User;


  constructor(
    private travelGroupService: TravelGroupService,
    private userService: UserService,
    private location: Location) {
    this.travelgroup = new TravelGroup();
    this.allUsers = new Array<User>();
  }

  ngOnInit() {
    this.loading = true;
    this.setForm();
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.allUsers = response;
        this.loading = false;
      }
    );
  }

  setForm() {
    this.groupUpdateForm = new FormGroup({
      name: new FormControl(this.travelgroup.name, [Validators.minLength(4), Validators.required])
    });
    this.travelgroup.users = new Array<User>();
  }

  submitForm() {
    const self = this;
    if (this.travelgroup) {
      this.travelGroupService.updateTravelGroup(this.travelgroup).subscribe(
        (response: any) => {
          console.log(response);
          self.travelgroup = response;
          this.back();
        });
    }
  }

  addUser(userId: number) {

    this.user = this.allUsers.find(user => user.id === userId);
    if (this.travelgroup.users.find(user => user.id === this.user.id)) {
      console.log('User already added');
    } else {
      this.travelgroup.users.push(this.user);
      this.allUsers.splice(this.allUsers.indexOf(this.user), 1);
    }
  }

  removeUser(userId: number) {
    this.user = this.travelgroup.users.find(userR => userR.id === userId);
    if (this.travelgroup.users.find(user => user.id === this.user.id)) {
      this.travelgroup.users.splice(this.travelgroup.users.indexOf(this.user), 1);
      this.allUsers.push(this.user);
    } else {
      console.log('User not found!!');
    }
  }

  back() {
    this.location.back();
  }
}
