import {Component, Input, OnInit} from '@angular/core';
import {Travelgroup} from '../../../models/travelgroup';
import {TravelgroupService} from '../../services/travelgroup.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input() user: User;

  selectedTravelGroup: Travelgroup;
  groups: Travelgroup[];
  loading = false;

  constructor(private travelgroupService: TravelgroupService) {
  }

  ngOnInit() {
    this.loading = true;
    this.travelgroupService.getTravelgroups(this.user.id).subscribe(
      (response: any) => {
        this.groups = response;
        this.loading = false;
      }
    );
  }
}
