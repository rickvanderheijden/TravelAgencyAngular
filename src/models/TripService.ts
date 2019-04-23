import {Address} from './Address';


export class TripService {
  public id?: number;
  public service_type?: String;
  public name?: String;
  public description?: String;
  public imageUrl?: String;
  public address?: Address;
  public date?: Date;
  public price?: number;


  constructor(model) {
    if (model !== undefined) {
      this.id = model.id;
      this.name = model.name;
      this.description = model.description;
      this.service_type = model.serviceType;
      this.address = new Address(model.address);
      this.price = model.price;
      this.date = new Date(model.date);
      this.imageUrl = model.imageUrl;
    }
  }
}
