const TokenService = require('./token');

module.exports = class LoginService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async login(username, password) {
        const response = await fetch(`${this.endpoint}/oauth/login`, {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify({username, password}),
            headers: {
                'content-type': 'application/json'
            }
        });
        const {token} = response.json();
        TokenService.setToken(token);
        return token;
    }
};
