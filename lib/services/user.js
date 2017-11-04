const {User} = require('../model');
const request = require('../request');
const ENDPOINT = 'users/';

module.exports = class UserService {
    /**
     * Fetch all the users.
     * @returns {Promise<Array<User>>} A promise with the array of users.
     */
    static fetchAll() {
        return request.get(`${ENDPOINT}all`).then(
            response => response.body.users.map(
                user => new User(user)
            )
        );
    }

    /**
     * Fetch one user by id.
     * @param id
     * @returns {Promise<User>} A promise with the found user.an
     */
    static fetchOne(id) {
        return request.get(`${ENDPOINT}${id}`).then(
            response => new User(response.body.user)
        );
    }

    /**
     * Fetch the users based on the given IDs.
     * @param {Array<String>} ids
     * @returns {Promise<Array<User>>}
     */
    static fetch(ids) {
        const idsString = ids && ids.length ? ids.join(',') : undefined;
        return request.get(ENDPOINT, {ids: idsString}).then(
            response => response.body.users.map(
                user => new User(user)
            )
        );
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
    static search({rol, state, term}) {
        return request.get(ENDPOINT, {rol, state, term}).then(
            response => response.body.users.map(
                user => new User(user)
            )
        );
    }

    /**
     * Add access for a given user.
     * @param {String} id User ID to add access.
     * @param {Array<String>} roles
     * @returns {Promise<User>}
     */
    static add(id, roles) {
        return request.put(`${ENDPOINT}${id}`, {roles}).then(
            response => new User(response.body.user)
        );
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
