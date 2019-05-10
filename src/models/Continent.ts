import {Country} from './country';


export class Continent {

  public id?: number;
  public name?: string;
  public countries?: Country[];


  constructor(model?) {
    const self = this;
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.name = model.name;
      this.countries = new Array<Country>();

      if (model.countries !== null) {
        model.countries.forEach(function (country, index) {
          self.countries.push(new Country(country));
        })
      }
    }
  }

}
