import { Component, OnInit } from '@angular/core';
import {Travelgroup} from '../../../models/travelgroup';
import {TravelgroupService} from '../../services/travelgroup.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  groups: Travelgroup[];
  loading = false;
  constructor(private travelgroupService: TravelgroupService) { }

  ngOnInit() {
    this.loading = true;
    this.travelgroupService.getAll().subscribe(
      (response: any) => {
        this.groups = response;
        this.loading = false;
      }
    );
  }
}
