import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Booking} from '../../../models/booking';
import {BookingService} from '../../services/booking.service';
import {User} from '../../../models/user';
import swal from 'sweetalert2';

@Component({
  selector: 'app-booking-actions',
  template: `
    <div>
      <span>
        <button class="btn btn-raised btn-success" routerLink="/bookings/read/{{rowData.id}}">
          <i class="ft-eye"></i>
        </button>
        <button class="btn btn-raised btn-warning" style="margin-left: 2px;" (click)="setPaid(rowData.id)" [disabled]="rowData.paid" title="set to paid">
          <i class="fas fa-wallet"></i>
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
    private router: Router,
    private service: BookingService
  ) { }

  ngOnInit() {

  }

  setPaid(id: any) {
    this.service.setPaid(id).subscribe((response: boolean) => {
      if ( response ) {
        swal('Succes', 'Boeking succesvol ingevoerd!', 'success');
      }
    });

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

    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.settings = {
      columns: {
        id: {
          title: 'ID',
          sortDirection: 'desc',
        },
        booker: {
          title: 'Geboekt door',
          filterFunction(cell?: User, search?: string): boolean {
            return cell.firstName.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1 || cell.lastName.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
          },
          sort: false,
          valuePrepareFunction: (value: User) => {
            return value.firstName + ' ' + value.lastName;
          }
        },
        numberOfTravelers: {
          title: 'Aantal reizigers',
          sort: false
        },
        totalPrice: {
          title: 'Prijs',
          type: 'text',
          filter: true,
          sort: false,
          valuePrepareFunction: (value: number) => {
            return '€' + value;
          }
        },
        paid: {
          title: 'Voldaan',
          type: 'text',
          filter: {
            type: 'list',
            config: {
              selectText: 'Toon allen',
              list: [
                {value: true, title: 'Ja'},
                {value: false, title: 'Nee'},
              ]
            }
          },
          sort: false,
          valuePrepareFunction: (value) => {
            if (value) {
              return 'Ja';
            } else {
              return 'Nee'
            }
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
    this.service.getBookings().subscribe((data: any) => {
      this.source.load(data);
    });
  }

}
