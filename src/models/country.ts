import {City} from './city';


export class Country {

  public name?: string;
  public continent?: string;
  public cities?: City[];


  constructor(model?) {
    const self = this;
    if (typeof model !== typeof undefined) {
      this.name = model.name;
      this.continent = model.continent;
      this.cities = new Array<City>();
      if (model.cities !== null && model.cities) {
        model.cities.forEach(function (city, index) {
          self.cities.push(new City(city));
        })
      }
    }
  }

}
