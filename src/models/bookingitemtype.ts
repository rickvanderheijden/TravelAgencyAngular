export class BookingItemType {
  public id: number;
  public type: String;
  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.type = model.type;
    }
  }
}
