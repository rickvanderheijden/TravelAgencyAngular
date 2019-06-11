import {User} from './user';

export class TravelGroup {
  public id?: number;
  public masterId?: number;
  public name?: string;
  public users: User[];

  constructor(model?) {
    if (model !== undefined) {
      this.id = model.id;
      this.masterId = model.masterId;
      this.name = model.name;
      this.users = model.users;
    }
  }
  //
  // private addUsers(user: User) {
  //   if (user !== undefined) {
  //     this.users.push(user);
  //   }
  // }
}
