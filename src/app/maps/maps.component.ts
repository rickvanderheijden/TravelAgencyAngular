import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})

export class MapsComponent implements OnInit {
    latitude= 45.678418;
    longitude= 7.809007;
    origin;
    destination;
    org;
    dest;

  ngOnInit(): void {
    //Get current location or something?
    this.org = 'Lageburchtweg 3, Uden';
    this.dest = 'primera uden';
    this.setDirection(this.org, this.dest);
  }

  setDirection(org: any, dest: any): void {
    this.origin = org;
    this.destination = dest;
  }
}
