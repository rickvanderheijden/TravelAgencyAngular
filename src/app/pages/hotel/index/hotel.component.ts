import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {Hotel} from '../../../../models/hotel';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

import {HotelService} from '../../../services/hotel.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-hotel-actions',
  template: `
    <div>
      <span>
        <button class="btn btn-raised btn-success" routerLink="/hotel/update/{{rowData.id}}">
          <i class="ft-edit"></i>
        </button>
      </span>
      <span>
        <button class="btn btn-raised btn-danger" (click)="deleteHotel(rowData.id)">
          <i class="ft-trash"></i>
        </button>
      </span>
    </div>
  `,
})
export class HotelActionButtonsComponent implements ViewCell, OnInit {

  loading = false;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() cancelEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('confirm') confirm: ElementRef;
  modalRef: NgbModalRef;

  constructor (
    private router: Router,
    private hotelService: HotelService
  ) { }

  ngOnInit() {

  }

  deleteHotel(id) {
    swal({
      title: 'Weet je het zeker?',
      text: 'Weet je zeker dat je het hotel wil verwijderen',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, verwijderen!',
      cancelButtonText: 'Nee, Hotel behouden'
    }).then((result) => {
      if (result.value) {
        this.hotelService.deleteHotel(id).subscribe((response: any) => {
            location.reload();
        });
      }
    });

  }
}

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  hotels: Array<Hotel>;
  settings: any;
  source: LocalDataSource;
  constructor(private service: HotelService) {
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
          renderComponent: HotelActionButtonsComponent
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
    this.service.getHotels().subscribe((data: any) => {
      this.source.load(data);
    });
  }

  ngOnInit() {
  }

  delete(event) {
    console.log('hoi', event);
  }
}
