
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
      this.userId = model.user;
      this.bookingId = model.booking;
      this.amount = model.amount;
    }
  }
}
