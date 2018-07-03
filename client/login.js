/* global fetch */
/**
 * Send login requests to the authorization authority.
 */
export default class LoginService {
    constructor(tokenService, endpoint) {
        this.tokenService = tokenService;
        this.endpoint = endpoint;
    }

    /**
     * Send a login request to the authorization authority.
     * @param {string} username the username credential.
     * @param {string} password the password credential.
     * @param {string} redirectUri optional URI for authentication, should include protocol.
     * @returns {Promise<string>} A promise with the new session token.
     */
    async login(username, password, redirectUri) {
        try {
            const response = await fetch(`${this.endpoint}/oauth/login`, {
                method: 'post',
                credentials: 'same-origin',
                body: JSON.stringify({username, password, redirectUri}),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const {token} = await response.json();
            this.tokenService.setToken(token);
            return token;
        } catch (err) {
            return null;
        }
    }
}
