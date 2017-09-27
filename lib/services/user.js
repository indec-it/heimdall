const {User} = require('../model');
const request = require('../request');
const ENDPOINT = 'users/';

module.exports = class UserService {
    /**
     * Fetch all the users.
     * @returns {Promise<Array<User>>}
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
     * @returns {Promise<User>}
     */
    static fetchOne(id) {
        return request.get(`${ENDPOINT}${id}`).then(
            response => new User(response.body.user)
        );
    }

    /**
     * Fetch the users based on the given filters.
     * @param {String} rol Rol
     * @param {Array<String>} ids
     * @param {String} term
     * @returns {Promise<Array<User>>}
     */
    static fetch(rol = undefined, ids = undefined, term = undefined) {
        const idsString = ids && ids.length ? ids.join(',') : undefined;
        return request.get(ENDPOINT, {rol, ids: idsString, term}).then(
            response => response.body.users.map(
                user => new User(user)
            )
        );
    }
};
