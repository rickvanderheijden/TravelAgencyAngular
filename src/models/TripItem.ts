import {Address} from './Address';


export class TripItem {
  public id?: number;
  public tripItemType?: String;
  public name?: String;
  public description?: String;
  public imageUrl?: String;
  public address?: Address;
  public date?: Date;
  public price?: number;


  constructor(model?) {
    if (typeof model !== 'undefined') {
      this.id = model.id;
      this.name = model.name;
      this.description = model.description;
      this.tripItemType = model.tripItemType;
      this.address = new Address(model.address);
      this.price = model.price;
      this.date = new Date(model.date);
      this.imageUrl = model.imageUrl;
    } else {
      this.date = new Date();
      this.address = new Address();
    }
  }
}
