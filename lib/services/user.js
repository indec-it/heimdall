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
