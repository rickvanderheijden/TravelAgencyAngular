export class Travelgroup {
  public id?: number;
  public groupName?: string;

  constructor(model) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.groupName = model.groupName;
    }
  }
}
