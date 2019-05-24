import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Travelgroup} from '../../../../models/travelgroup';
import {TravelgroupService} from '../../../services/travelgroup.service';
import {User} from '../../../../models/user';
import {UserService} from '../../../services/user.service';

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

  constructor(
    private travelgroupService: TravelgroupService,
    private userService: UserService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute) {
    this.travelgroup = new Travelgroup();
  }

  ngOnInit() {
    this.loading = true;
    this.setForm();
    this.userId = this.route.snapshot.params.id;
    // this.masterUser = new User(JSON.parse(sessionStorage.getItem('currentUser')));
    this.loading = false;
  }

  setForm() {
    this.groupCreateForm = new FormGroup({
      name: new FormControl(this.travelgroup.name, [Validators.minLength(4), Validators.required])
    });
  }

  submitForm() {
    this.travelgroup.masterId = this.userId;
    // this.travelgroup.users.push(this.masterUser);
    console.log(this.userId);
    console.log(this.travelgroup);
    if (this.travelgroup) {
      this.travelgroupService.createTravelGroup(this.travelgroup).subscribe(
        (response: any) => {
          console.log(response);
          this.back();
        });
    }
  }

  back() {
    this.location.back();
  }
}
