/* global localStorage */
module.exports = class TokenService {
    static setToken(token) {
        localStorage.setItem('id_token', token);
    }

    static getToken() {
        return localStorage.getItem('id_token');
    }

    static clear() {
        localStorage.removeItem('id_token');
    }

    static getAuthHeader() {
        return `Bearer ${TokenService.getToken()}`;
    }
};
