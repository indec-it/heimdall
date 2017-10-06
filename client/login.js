/* global fetch */
import TokenService from './token';

/**
 * Send login requests to the authorization authority.
 */
export default class LoginService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    /**
     * Send a login request to the authorization authority.
     * @param {string} username the username credential.
     * @param {string} password the password credential.
     * @returns {Promise<string>} A promise with the new session token.
     */
    async login(username, password) {
        try {
            const response = await fetch(`${this.endpoint}/oauth/login`, {
                method: 'post',
                credentials: 'same-origin',
                body: JSON.stringify({username, password}),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const {token} = await response.json();
            TokenService.setToken(token);
            return token;
        } catch (err) {
            return err;
        }
    }
}
