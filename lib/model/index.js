exports.User = class User {
    constructor(obj) {
        this._id = undefined;
        this.name = undefined;
        this.surname = undefined;
        this.email = undefined;
        this.documentId = undefined;
        this.state = undefined;
        Object.assign(this, obj);
    }
};

exports.Rol = class Rol {
    constructor(obj) {
        this.id = undefined;
        this.name = undefined;
        Object.assign(this, obj);
    }
};
