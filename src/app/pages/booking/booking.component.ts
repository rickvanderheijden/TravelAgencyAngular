import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Booking} from '../../../models/booking';
import {BookingService} from '../../services/booking.service';

@Component({
  selector: 'app-booking-actions',
  template: `
    <div>
      <span>
        <button class="btn btn-raised btn-success" routerLink="/booking/read/{{rowData.id}}">
          <i class="ft-eye"></i>
        </button>
      </span>
    </div>
  `,
})
export class BookingActionButtonsComponent implements ViewCell, OnInit {

  loading = false;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() cancelEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('confirm') confirm: ElementRef;
  modalRef: NgbModalRef;

  constructor (
    private router: Router
  ) { }

  ngOnInit() {

  }
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookings: Booking[];
  settings: any;
  source: LocalDataSource;

  constructor(private service: BookingService) {
    this.settings = {
      columns: {
        id: {
          title: 'ID',
          sortDirection: 'desc',
        },
        name: {
          title: 'Naam',
        },
        address: {
          title: 'Adres',
          valuePrepareFunction: (value) => {
            return value !== null ? value.city.name + ' - ' + value.country.name : 'NB';
          },
          filterFunction(cell?: any, search?: string): boolean {
            if ( cell.city.name.indexOf(search) !== -1 || cell.country.name.indexOf(search) !== -1) {
              return true;
            }
            return false;
          }
        },
        price: {
          title: 'prijs',
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
          renderComponent: BookingActionButtonsComponent
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
    this.service.getBookings().subscribe((data: any) => {
      this.source.load(data);
    });
  }

  ngOnInit() {
  }

}
