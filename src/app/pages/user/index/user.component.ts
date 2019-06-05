import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../../../../models/user';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {UserService} from '../../../services/user.service';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-authority',
  template: `
    <span i18n>{{authorities}}</span>
  `,
})
export class UserAuthorityComponent implements ViewCell, OnInit {

  authorities: String;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    const thiz = this;
    this.rowData.authorities.forEach( function (authority, index) {
      thiz.authorities = authority.name;
    });
  }

}

@Component({
  selector: 'app-user-actions',
  template: `
    <div>
      <span>
        <button class="btn btn-raised btn-success" routerLink="/user/update/{{this.rowData.id}}">
          <i class="ft-edit"></i>
        </button>
      </span>
      <span>
        <button class="btn btn-raised btn-danger" (click)="deleteUser()">
          <i class="ft-trash"></i>
        </button>
      </span>
    </div>
  `,
})
export class UserActionButtonsComponent implements ViewCell, OnInit {

  loading = false;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() cancelEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('confirm') confirm: ElementRef;
  modalRef: NgbModalRef;

  constructor (
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {

  }

  deleteUser() {
    this.userService.deleteUser(this.rowData.id);
  }
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: Array<User>;
  settings: any;
  source: LocalDataSource;

  constructor( private service: UserService) {
    this.settings = {
      columns: {
        id: {
          title: 'ID',
          sortDirection: 'desc',
        },
        firstName: {
          title: 'Voornaam',
        },
        lastName: {
          title: 'Achternaam',
        },
        emailAddress: {
          title: 'Emailadres',
        },
        authorities: {
          title: 'Rol',
          type: 'custom',
          filter: false,
          renderComponent: UserAuthorityComponent
        },
        actions: {
          title: 'Acties',
          type: 'custom',
          filter: false,
          sort: false,
          renderComponent: UserActionButtonsComponent
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
    this.service.getUsers().subscribe((data: any) => {
      this.source.load(data);
    });

  }

  ngOnInit() {
  }
}
