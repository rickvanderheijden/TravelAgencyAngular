import {UserRole} from './user-role';

export class User {

    public username?: String;
    public firstname?: String;
    public middlename?: String;
    public lastname?: String;
    public email?: String;
    public roles: Array<UserRole>;

    constructor(model?) {
        if (model !== undefined) {

            this.username = model.username;
            this.firstname = model.firstname;
            this.middlename = model.middlename;
            this.lastname = model.lastname;
            this.email = model.email;
            this.roles = new Array<UserRole>();
            if ( model.roles !== undefined ) {
                for ( const role of model.roles ) {
                    this.addRole(new UserRole(role));
                }
            }

        }
    }

    public addRole(role: UserRole) {
        if ( role !== undefined) {
            this.roles.push(role);
        }
    }
}

