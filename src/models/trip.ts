export class Trip {

  public id: number;
  public name: String;
  public total_price: number;
  public image_url: String;

  constructor(model) {
    if (model !== undefined) {
      this.id = model.id;
      this.name = model.name;
      this.total_price = model.total_price;
      this.image_url = model.image_url;
    }
  }
}
