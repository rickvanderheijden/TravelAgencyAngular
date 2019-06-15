import {Address} from './Address';

export class Message {

  public id?: number;
  public message?: String;
  public userFrom?: number;
  public travelGroupTo?: number;
  public userTo?: number;

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.message = model.message;
      this.userFrom = model.userFrom;
      this.travelGroupTo = model.travelGroupTo;
      this.userTo = model.userTo;
    }
  }
}
