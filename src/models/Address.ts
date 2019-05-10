import {Country} from './country';
import {City} from './city';

export class Address {
  public id?: number;
  public addressLine?: String;
  public zipCode?: String;
  public city?: City;
  public country?: Country;


  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.addressLine = model.addressLine;
      this.zipCode = model.zipCode;
      this.city = new City(model.city);
      this.country = new Country(model.country);
    } else {
      this.city = new City();
      this.country = new Country();
    }
  }
}
