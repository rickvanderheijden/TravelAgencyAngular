import {Authority} from './authority';
import {Travelgroup} from './travelgroup';

export class User {

    public id?: number;
    public username?: String;
    public password?: String;
    public firstname?: String;
    public lastname?: String;
    public emailAddress?: String;
    public authorities: Array<Authority>;
    public travelgroups?: Array<Travelgroup>;

    constructor(model?) {
        if (typeof model !== typeof undefined) {
            this.id = model.id;
            this.username = model.username;
            this.firstname = model.firstname;
            this.lastname = model.lastname;
            this.emailAddress = model.emailAddress;
            this.authorities = new Array<Authority>();
            this.travelgroups = new Array<Travelgroup>();
            if ( model.authorities !== undefined ) {
                for ( const authority of model.authorities ) {
                    this.addAuthority(new Authority(authority));
                }
            }
            if ( model.travelgroups !== undefined ) {
               for ( const travelgroup of model.travelgroups ) {
                 this.addTravelgroup(new Travelgroup(travelgroup));
               }
            }
        }
    }

    public addAuthority(authority: Authority) {
        if ( authority !== undefined) {
            this.authorities.push(authority);
        }
    }

    public addTravelgroup(travelgroup: Travelgroup) {
      if ( travelgroup !== undefined) {
        this.travelgroups.push(travelgroup);
      }
    }

    isAdmin() {
      let isAdmin = false;
      this.authorities.forEach(function (authoriry, index) {
        if (authoriry.name === 'ROLE_ADMIN') {
          isAdmin = true;
        }
      });
      return isAdmin;
    }
}

