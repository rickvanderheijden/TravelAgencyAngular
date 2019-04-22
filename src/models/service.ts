export class Service {

  public id: number;
  public serviceType: String;
  public name: String;
  public description: String;
  public imageUrl: String;
  public address: String;
  public price: number;
  public date: Date;



  constructor(model) {
    if (model !== undefined) {
      this.id = model.id;
      this.serviceType = model.serviceType;
      this.name = model.name;
      this.description = model.description;
      this.imageUrl = model.imageUrl;
      this.address = model.address;
      this.price = model.price;
      this.date = model.date;
    }
  }
}
