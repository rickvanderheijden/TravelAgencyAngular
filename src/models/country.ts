import {City} from './city';


export class Country {

  public name?: string;
  public continent?: string;
  public cities?: City[];


  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.name = model.name;
      this.continent = model.continent;
      this.cities = model.cities;
    }
  }

}
