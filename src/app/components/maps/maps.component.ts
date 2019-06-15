import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})

export class MapsComponent implements OnInit {
  loading = true;
  latitude = 45.678418;
  longitude = 7.809007;
  origin = '';
  destination = '';
  zoom = 50;
  waypoints: object[] = new Array();
  travelMode: string;

  ngOnInit(): void {
    this.loading = false;
  }

  setZoom(value: number) {
    this.zoom = value;
  }

  setDirection(org: any, dest: any): void {
    this.origin = org;
    this.destination = dest;
  }

  addWaypoint(location: any, stopover: boolean) {
    const waypoint = {location, stopover};
    this.waypoints.push(waypoint);
  }
}
