/* global localStorage */
export default class TokenService {
    /**
     * Store the session token
     * @param token A token to be saved.
     */
    static setToken(token) {
        localStorage.setItem('id_token', token);
    }

    /**
     * Get the session token.
     * @returns {string} Returns the current session token.
     */
    static getToken() {
        return localStorage.getItem('id_token');
    }

    /**
     * Check if a token session is present.
     * @returns {boolean} Returns True when a token is present.
     */
    static hasSession() {
        return !!localStorage.getItem('id_token');
    }

    /**
     * Clear the session token.
     */
    static clear() {
        localStorage.removeItem('id_token');
    }

    /**
     * Get a Bearer Auth Header for make HTTP requests.
     * @returns {string} An authorization header.
     */
    static getAuthHeader() {
        return `Bearer ${TokenService.getToken()}`;
    }
}
