/* global localStorage */
export default class TokenService {
    static setToken(token) {
        localStorage.setItem('id_token', token);
    }

    static getToken() {
        return localStorage.getItem('id_token');
    }

    /**
     * Returns True
     * @returns {boolean}
     */
    static hasSession() {
        return !!localStorage.getItem('id_token');
    }

    static clear() {
        localStorage.removeItem('id_token');
    }

    static getAuthHeader() {
        return `Bearer ${TokenService.getToken()}`;
    }
}
