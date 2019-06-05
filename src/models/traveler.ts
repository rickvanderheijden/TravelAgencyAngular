export class Traveler {

    public id?: number;
    public firstName?: String;
    public lastName?: String;

    constructor(model?) {
        if (typeof model !== typeof undefined) {
            this.id = model.id;
            this.firstName = model.firstName;
            this.lastName = model.lastName;
        }
    }
}

