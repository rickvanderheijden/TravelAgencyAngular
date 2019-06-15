export class Message {

  public id?: number;
  public message?: String;
  public senderId?: number;
  public travelGroupTo?: number;
  public receiverId?: number;

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.message = model.message;
      this.senderId = model.senderId;
      this.travelGroupTo = model.travelGroupTo;
      this.receiverId = model.receiverId;
    }
  }
}
