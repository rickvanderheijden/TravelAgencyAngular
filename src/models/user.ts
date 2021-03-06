import {Authority} from './authority';
import {TravelGroup} from './travelGroup';

export class User {

    public id?: number;
    public username?: String;
    public password?: String;
    public firstName?: String;
    public lastName?: String;
    public emailAddress?: String;
    public avatar?: String;
    public authorities: Array<Authority>;
    public travelGroups: Array<TravelGroup>;
    public online?: boolean;

    constructor(model?) {
        if (typeof model !== typeof undefined) {
            this.id = model.id;
            this.username = model.username;
            this.firstName = model.firstName;
            this.lastName = model.lastName;
            this.emailAddress = model.emailAddress;
            this.avatar = model.avatar;
            this.authorities = new Array<Authority>();
            this.travelGroups = new Array<TravelGroup>();
            if ( model.authorities !== undefined ) {
                for ( const authority of model.authorities ) {
                    this.addAuthority(new Authority(authority));
                }
            }
            if ( model.travelGroups !== undefined ) {
               for ( const travelGroup of model.travelGroups ) {
                 this.addTravelGroup(new TravelGroup(travelGroup));
               }
            }
        } else {
          this.authorities = new Array<Authority>();
          this.travelGroups = new Array<TravelGroup>();
        }
    }

    public addAuthority(authority: Authority) {
        if ( authority !== undefined) {
            this.authorities.push(authority);
        }
    }

    public addTravelGroup(travelGroup: TravelGroup) {
      if ( travelGroup !== undefined) {
        this.travelGroups.push(travelGroup);
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

    getFullName() {
      return this.firstName + ' ' + this.lastName;
    }
}
