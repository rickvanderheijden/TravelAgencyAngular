import {Authority} from './authority';
import {forEach} from '@angular/router/src/utils/collection';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {isBoolean} from 'util';

export class User {

    public id?: number;
    public username?: String;
    public password?: String;
    public firstname?: String;
    public lastname?: String;
    public emailAddress?: String;
    public authorities: Array<Authority>;

    constructor(model?) {
        if (model !== undefined) {
            this.id = model.id;
            this.username = model.username;
            this.firstname = model.firstname;
            this.lastname = model.lastname;
            this.emailAddress = model.emailAddress;
            this.authorities = new Array<Authority>();
            if ( model.authorities !== undefined ) {
                for ( const authority of model.authorities ) {
                    this.addAuthority(new Authority(authority));
                }
            }

        }
    }

    public addAuthority(authority: Authority) {
        if ( authority !== undefined) {
            this.authorities.push(authority);
        }
    }

    async isAdmin()  {
      const isAdmin = new BehaviorSubject<boolean>(false);
      await this.authorities.forEach(function (authoriry, index) {
        if (authoriry.authorityName === 'ROLE_ADMIN') {
          isAdmin.next( true);
        }
      });

      let can = false;

      await isAdmin.subscribe(admin => {
        can =  admin;
      });
      return  can;
    }
}

