const {User} = require('../model');
const request = require('../request');
const ENDPOINT = 'users/';

module.exports = class UserService {
    /**
     * Fetch all the users.
     * @returns {Promise<Array<User>>} A promise with the array of users.
     */
    static async fetchAll() {
        const {users} = await request.get(`${ENDPOINT}all`);
        return users.map(user => new User(user));
    }

    /**
     * Fetch one user by id.
     * @param id
     * @returns {Promise<User>} A promise with the found user.an
     */
    static async fetchOne(id) {
        const {user} = await request.get(`${ENDPOINT}${id}`);
        return new User(user);
    }

    /**
     * Fetch the users based on the given IDs.
     * @param {Array<String>} ids
     * @returns {Promise<Array<User>>}
     */
    static async fetch(ids) {
        const idsString = ids && ids.length ? ids.join(',') : undefined;
        const {users} = await request.get(ENDPOINT, {ids: idsString});
        return users.map(user => new User(user));
    }

    // static fetch(rol = undefined, ids = undefined, term = undefined) {
    /**
     * Search the users based on the given filters.
     * @param {Object} opts Object with filters.
     * @param {String} opts.rol Rol filter.
     * @param {Number} opts.state State filter.
     * @param {String} opts.term Terms to filter.
     * @returns {Promise<Array<User>>}
     */
    static async search({rol, state, term}) {
        const {users} = await request.get(ENDPOINT, {rol, state, term});
        return users.map(user => new User(user));
    }

    /**
     * Add access for a given user.
     * @param {String} id User ID to add access.
     * @param {Array<String>} roles
     * @returns {Promise<User>}
     */
    static async add(id, roles) {
        const {user} = await request.put(`${ENDPOINT}${id}`, {roles});
        return new User(user);
    }

    /**
     * Remove access for a given uer.
     * @param {String} id User ID to remove access.
     * @returns {void}
     */
    static remove(id) {
        return request.del(`${ENDPOINT}${id}`);
    }
};
