import {TripService} from './TripService';

export class Trip {

  public id: number;
  public name: String;
  public description: String;
  public summary: String;
  public total_price: number;
  public image_url: String;
  public discount: number;
  public tripServices: TripService[];

  constructor(model) {
    if (model !== undefined) {
      this.id = model.id;
      this.name = model.name;
      this.description = model.description;
      this.summary = model.summary;
      this.total_price = model.totalPrice;
      this.image_url = model.imageUrl;
      this.discount = model.discount;
      this.tripServices = model.tripServices;
    }
  }
}
