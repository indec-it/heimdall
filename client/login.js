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

    async fetchRefreshToken(clientId, clientSecret) {
        try {
            const response = await fetch(`${this.endpoint}/oauth/refreshToken`, {
                method: 'post',
                credentials: 'same-origin',
                body: JSON.stringify({
                    grant_type: 'refresh_code',
                    'client_id': clientId,
                    'client_secret': clientSecret
                }),
                headers: {
                    'content-type': 'application/json',
                    authorization: await this.tokenService.getAuthHeader()
                }
            });
            const {refreshToken} = await response.json();
            this.tokenService.setRefreshToken(refreshToken);
            return refreshToken;
        } catch (err) {
            return null;
        }
    }

    async refreshAccessToken(clientId, clientSecret) {
        try {
            const query = [
                'grant_type=refresh_code',
                `client_id=${clientId}`,
                `client_secret=${clientSecret}`,
                `refresh_token=${await this.tokenService.getRefreshToken()}`
            ].join('&');

            const response = await fetch(`${this.endpoint}/oauth/refreshToken?${query}`, {
                credentials: 'same-origin',
                headers: {
                    authorization: await this.tokenService.getAuthHeader()
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
