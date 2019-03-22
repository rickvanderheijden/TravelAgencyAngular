import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})

export class MapsComponent implements OnInit {
    latitude= 45.678418;
    longitude= 7.809007;
    origin;
    destination;
    org;
    dest;
    waypoints: object[];
    travelMode: string;

  ngOnInit(): void {
    //Get current location or something?
    this.org = 'Lageburchtweg 3, Uden';
    this.dest = 'primera uden';
    this.waypoints = new Array();

    //For testing purposes
    //this.setDirection(this.org, this.dest);
    //this.addWaypoint('Pianostraat 7, Uden',true);
  }

  setDirection(org: any, dest: any): void {
    this.origin = org;
    this.destination = dest;
  }
  addWaypoint(location: any, stopover: boolean) {
    var w = {location, stopover};
    this.waypoints.push(w);
  }
}
