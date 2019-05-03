import {TripItem} from './TripItem';

export class Trip {

  public id?: number;
  public name: String;
  public description: String;
  public summary: String;
  public totalPrice: number;
  public imageUrl: String;
  public discount: number;
  public tripItems: TripItem[];

  constructor(model?) {
    if (typeof model !== 'undefined') {
      this.id = model.id;
      this.name = model.name;
      this.description = model.description;
      this.summary = model.summary;
      this.totalPrice = model.totalPrice;
      this.imageUrl = model.imageUrl;
      this.discount = model.discount;
      this.tripItems = model.tripItems;
    }
  }
}
