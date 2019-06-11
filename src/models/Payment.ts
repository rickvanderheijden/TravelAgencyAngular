
export class Payment {
  public id?: number;
  public method: String;
  public bookingId: number;
  public userId: number;
  public amount: number;


  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.method = model.method;
      this.userId = model.userId;
      this.bookingId = model.bookingId;
      this.amount = model.amount;
    }
  }
}
