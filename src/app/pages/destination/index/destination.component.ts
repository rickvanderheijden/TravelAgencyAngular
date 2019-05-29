import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {Destination} from '../../../../models/destination';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

import {DestinationService} from '../../../services/destination.service';

@Component({
  selector: 'app-destination-actions',
  template: `
    <div>
      <span>
        <button class="btn btn-raised btn-success" routerLink="/destination/update/{{this.rowData.id}}">
          <i class="ft-edit"></i>
        </button>
      </span>
      <span>
        <button class="btn btn-raised btn-danger" (click)="deleteDestination()">
          <i class="ft-trash"></i>
        </button>
      </span>
    </div>
  `,
})
export class DestinationActionButtonsComponent implements ViewCell, OnInit {

  loading = false;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() cancelEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('confirm') confirm: ElementRef;
  modalRef: NgbModalRef;

  constructor (
    private router: Router,
    private destinationService: DestinationService
  ) { }

  ngOnInit() {

  }

  deleteDestination() {
    this.destinationService.deleteDestination(this.rowData.id);
  }
}

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {
  destinations: Array<Destination>;
  settings: any;
  source: LocalDataSource;
  constructor(private service: DestinationService) {
    this.settings = {
      columns: {
        id: {
          title: 'ID',
          sortDirection: 'desc',
        },
        hotel: {
          title: 'Hotel',
          valuePrepareFunction: (value) => {
            return value !== null ? value.name : 'Geen';
          }
        },
        city: {
          title: 'Stad',
          type: 'text',
          filter: true,
          sort: true,
          valuePrepareFunction: (value) => {
            return value.name;
          }
        },
        tripItems: {
          title: 'Aantal TripItems',
          type: 'text',
          filter: true,
          sort: true,
          valuePrepareFunction: (value) => {
            return value.length;
          }
        },
        actions: {
          title: 'Acties',
          type: 'custom',
          filter: false,
          sort: false,
          renderComponent: DestinationActionButtonsComponent
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
    this.service.getDestinations().subscribe((data: any) => {
      console.log(data);
      this.source.load(data);
    });
  }

  ngOnInit() {
  }

}
