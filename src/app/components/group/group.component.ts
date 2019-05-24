import {Component, Input, OnInit} from '@angular/core';
import {Travelgroup} from '../../../models/travelgroup';
import {TravelgroupService} from '../../services/travelgroup.service';
import {User} from '../../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input() user: User;

  groups: Travelgroup[];
  loading = false;

  constructor(private router: Router, private travelgroupService: TravelgroupService) {
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
