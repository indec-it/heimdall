const {Rol} = require('../model');
const request = require('../request');
const ENDPOINT = 'roles/';

module.exports = class RolService {
    static fetch() {
        return request.get(ENDPOINT).then(
            response => response.body.roles.map(
                rol => new Rol(rol)
            )
        );
    }
};
