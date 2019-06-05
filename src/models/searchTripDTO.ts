export class SearchTripDTO {

  public continent: String;
  public country: String;
  public from: String;
  public to: String;

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.continent = model.continent;
      this.country = model.country;
      this.from = model.from;
      this.to = model.to;
    }
  }
}
