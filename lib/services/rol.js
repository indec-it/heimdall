const {Rol} = require('../model');
const request = require('../request');
const ENDPOINT = 'roles/';

module.exports = class RolService {
    /**
     * Fetch all the roles.
     * @returns {Promise<Array<Rol>>} A promise with the array of roles.
     */
    static fetch() {
        return request.get(ENDPOINT).then(
            response => response.body.roles.map(
                rol => new Rol(rol)
            )
        );
    }
};
