import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {Hotel} from '../../../../models/hotel';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

import {HotelService} from '../../../services/hotel.service';

@Component({
  selector: 'app-hotel-actions',
  template: `
    <div>
      <span>
        <button class="btn btn-raised btn-success" routerLink="/hotel/update/{{this.rowData.id}}">
          <i class="ft-edit"></i>
        </button>
      </span>
      <span>
        <button class="btn btn-raised btn-danger" (click)="deleteHotel()">
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

  deleteHotel() {
    this.hotelService.deleteHotel(this.rowData.id);
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
      console.log(data);
      this.source.load(data);
    });
  }

  ngOnInit() {
  }

}
