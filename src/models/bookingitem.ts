export class BookingItem {
  public id: number;
  public bookingItemType: String;
  public itemId: number;
  public name: String;
  public description: String;
  public numberOfAttendees: number;
  public price: number;

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.bookingItemType = model.type;
      this.itemId = model.itemId;
      this.name = model.name;
      this.description = model.description;
      this.numberOfAttendees = model.numberOfAttendees;
      this.price = model.price;
    }
  }
}
