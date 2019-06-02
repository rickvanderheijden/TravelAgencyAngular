import {BookingItemType} from './bookingitemtype';

export class BookingItem {
  public id: number;
  public type: BookingItemType;
  public itemId: number;
  public description: String;
  public numberOfAttendees: number;
  public price: number;

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.type = model.type;
      this.itemId = model.itemId;
      this.description = model.description;
      this.price = model.price;
    }
  }
}
