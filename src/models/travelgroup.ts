import {User} from './user';

export class Travelgroup {
  public id?: number;
  public masterId?: number;
  public name?: string;
  public users?: Array<User>;

  constructor(model?) {
    if (model !== undefined) {
      this.id = model.id;
      this.masterId = model.masterId;
      this.name = model.name;
      this.users = new Array<User>();
      if (model.users !== undefined) {
        for (const user of model.users) {
          this.users.push(new User(user));
        }
      }
    }
  }
  //
  // private addUsers(user: User) {
  //   if (user !== undefined) {
  //     this.users.push(user);
  //   }
  // }
}
