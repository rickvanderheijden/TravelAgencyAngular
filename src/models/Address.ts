import {Country} from './country';
import {City} from './city';

export class Address {
  public id?: number;
  public address?: String;
  public zipcode?: String;
  public city?: City;
  public country?: Country;


  constructor(model?) {
  if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.address = model.address;
      this.zipcode = model.zipcode;
      this.city = new City(model.city);
      this.country = new Country(model.country);
    } else {
      this.city = new City();
      this.country = new Country();
    }
  }
}
