export class Authority {
    public id?: number;
    public name?: String;

    constructor(model) {
      if (typeof model !== typeof undefined) {
            this.id = model.id;
            this.name = model.name;
        }
    }
}
