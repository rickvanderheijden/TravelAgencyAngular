import {Component, Input, OnInit} from '@angular/core';
import {TravelGroup} from '../../../models/travelGroup';
import {User} from '../../../models/user';
import {TravelGroupService} from '../../services/travelgroup.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  @Input() travelGroup: TravelGroup;

  users: User[];
  loading = false;
  constructor(private travelGroupService: TravelGroupService) {

  }

  ngOnInit() {
    this.loading = true;
    this.travelGroupService.getUsers(this.travelGroup.id).subscribe(
      (response: any) => {
        this.users = response;
        this.loading = false;
      }
    )
  }
}
