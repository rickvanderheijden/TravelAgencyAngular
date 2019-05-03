import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {Trip} from '../../../../models/trip';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {TripItemService} from '../../../services/trip-item.service';


@Component({
  selector: 'app-trip-item-actions',
  template: `
    <div>
      <span>
        <button class="btn btn-raised btn-success" routerLink="/trip-item/update/{{this.rowData.id}}">
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
export class TripItemActionButtonsComponent implements ViewCell, OnInit {

  loading = false;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() cancelEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('confirm') confirm: ElementRef;
  modalRef: NgbModalRef;

  constructor (
    private router: Router,
    private tripItemService: TripItemService
  ) { }

  ngOnInit() {

  }

  deleteTrip() {
    this.tripItemService.deleteTripItem(this.rowData.id);
  }
}

@Component({
  selector: 'app-trip-item',
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.scss']
})
export class TripItemComponent implements OnInit {
  trips: Array<Trip>;
  settings: any;
  source: LocalDataSource;
  constructor(private service: TripItemService) {
    this.settings = {
      columns: {
        id: {
          title: 'ID',
          sortDirection: 'desc',
        },
        name: {
          title: 'Naam',
        },
        price: {
          title: 'Prijs',
          type: 'text',
          filter: true,
          sort: true,
          valuePrepareFunction: (value) => {
            console.log(value);
            return '€' + value;
          }
        },
        tripItemType: {
          title: 'Type'
        },
        actions: {
          title: 'Acties',
          type: 'custom',
          filter: false,
          sort: false,
          renderComponent: TripItemActionButtonsComponent
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
    this.service.getTripItems().subscribe((data: any) => {
      this.source.load(data);
    });
  }

  ngOnInit() {
  }

}
