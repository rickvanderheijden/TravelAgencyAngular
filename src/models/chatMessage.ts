import {User} from './user';

export class ChatMessage {

  public id?: number;
  public message?: String;
  public sender?: User;
  public travelGroupTo?: number;
  public receiverId?: number;

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.message = model.message;
      this.sender = model.sender;
      this.travelGroupTo = model.travelGroupTo;
      this.receiverId = model.receiverId;
    }
  }
}
