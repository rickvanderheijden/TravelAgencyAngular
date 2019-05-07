import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {Trip} from '../../../../models/trip';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

import {TripService} from '../../../services/trip.service';

@Component({
  selector: 'app-trip-actions',
  template: `
    <div>
      <span>
        <button class="btn btn-raised btn-success" routerLink="/trip/update/{{this.rowData.id}}">
          <i class="ft-edit"></i>
        </button>
      </span>
      <span>
        <button class="btn btn-raised btn-danger" (click)="deleteTrip()">
          <i class="ft-trash"></i>
        </button>
      </span>
    </div>
  `,
})
export class TripActionButtonsComponent implements ViewCell, OnInit {

  loading = false;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() cancelEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('confirm') confirm: ElementRef;
  modalRef: NgbModalRef;

  constructor (
    private router: Router,
    private tripService: TripService
  ) { }

  ngOnInit() {

  }

  deleteTrip() {
    this.tripService.deleteTrip(this.rowData.id);
  }
}

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  trips: Array<Trip>;
  settings: any;
  source: LocalDataSource;
  constructor(private service: TripService) {
    this.settings = {
      columns: {
        id: {
          title: 'ID',
          sortDirection: 'desc',
        },
        name: {
          title: 'Naam',
        },
        totalPrice: {
          title: 'totalPrice',
          type: 'text',
          filter: true,
          sort: true,
          valuePrepareFunction: (value) => {
            return '€' + value;
          }
        },
        actions: {
          title: 'Acties',
          type: 'custom',
          filter: false,
          sort: false,
          renderComponent: TripActionButtonsComponent
        },
      },
      actions: {
        add: false,
        edit: false,
        delete: false
      },
      pager: {
        display: true,
        perPage: 20
      }
    };

    this.source = new LocalDataSource();
    this.service.getTrips().subscribe((data: any) => {
      this.source.load(data);
    });
  }

  ngOnInit() {
  }

}
