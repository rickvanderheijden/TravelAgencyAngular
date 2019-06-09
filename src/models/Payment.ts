import {Booking} from './booking';
import {User} from './user';

export class Payment {
  public id?: number;
  public method: String;
  public booking: Booking;
  public user: User;
  public amount: number;


  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.method = model.method;
      this.user = model.user;
      this.booking = model.booking;
      this.amount = model.amount;
    }
  }
}
