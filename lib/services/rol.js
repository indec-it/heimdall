const {Rol} = require('../model');
const request = require('../request');
const ENDPOINT = 'roles/';

module.exports = class RolService {
    /**
     * Fetch all the roles.
     * @returns {Promise<Array<Rol>>} A promise with the array of roles.
     */
    static async fetch() {
        const {roles} = await request.get(ENDPOINT);
        return roles.map(rol => new Rol(rol));
    }
};
