
export class Payment {
  public id?: number;
  public method: String;
  public createdAt: Date;
  public bookingId: number;
  public userId: number;
  public amount: number;


  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.method = model.method;
      this.createdAt = new Date(model.createdAt);
      this.userId = model.userId;
      this.bookingId = model.bookingId;
      this.amount = model.amount;
    } else {
      this.createdAt = new Date();
    }
  }
}
