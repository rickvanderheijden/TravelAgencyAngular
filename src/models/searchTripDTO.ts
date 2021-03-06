export class SearchTripDTO {

  public continent: String;
  public country: String;
  public from: Date;
  public to: Date;
  public keyword: String;

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.continent = model.continent;
      this.country = model.country;
      this.from = model.from;
      this.to = model.to;
      this.keyword = model.keyword;
    }
  }

  emptySearch() {
    return (this.keyword == null && this.continent == null && this.country == null && this.from == null && this.to == null);
  }
}
