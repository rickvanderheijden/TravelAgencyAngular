import {Component, Input, OnInit} from '@angular/core';
import {Travelgroup} from '../../../models/travelgroup';
import {User} from '../../../models/user';
import {TravelgroupService} from '../../services/travelgroup.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  @Input() travelGroup: Travelgroup;

  users: User[];
  loading = false;

  constructor(private travelGroupService: TravelgroupService) {
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
