import {Component, Input, OnInit} from '@angular/core';
import {Travelgroup} from '../../../models/travelgroup';
import {TravelGroupService} from '../../services/travelgroup.service';
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


  constructor(private router: Router, private travelgroupService: TravelGroupService) {
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

  createGroup() {
    this.router.navigate(['/group/create/' + this.user.id])
  }
}
