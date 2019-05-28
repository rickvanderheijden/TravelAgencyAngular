import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {TravelGroupService} from '../../../services/travelgroup.service';
import {Travelgroup} from '../../../../models/travelgroup';

@Component({
  selector: 'app-group-actions',
  template: `
    <div>
      <span>
        <button class="btn btn-raised btn-success" routerLink="/group/update/{{this.rowData.id}}">
          <i class="ft-edit"></i>
        </button>
      </span>
      <span>
      </span>
    </div>
  `,
})
export class GroupActionButtonsComponent implements ViewCell, OnInit {

  loading = false;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() cancelEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('confirm') confirm: ElementRef;
  modalRef: NgbModalRef;

  constructor (
    private router: Router,
    private travelGroupService: TravelGroupService
  ) { }

  ngOnInit() {

  }
}

@Component({
  selector: 'app-group-actions',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  groups: Array<Travelgroup>;
  settings: any;
  source: LocalDataSource;
  constructor(private service: TravelGroupService) {
    this.settings = {
      columns: {
        id: {
          title: 'ID',
          sortDirection: 'desc',
        },
        groupname: {
          title: 'Naam',
        },
        actions: {
          title: 'Acties',
          type: 'custom',
          filter: false,
          sort: false,
          renderComponent: GroupActionButtonsComponent
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
  }

  ngOnInit() {
  }

}
