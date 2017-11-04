/* global localStorage */
const TOKEN_KEY = 'id_token';

export default class TokenService {
    /**
     * Store the session token
     * @param token A token to be saved.
     */
    static setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    /**
     * Get the session token.
     * @returns {string} Returns the current session token.
     */
    static getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    /**
     * Check if a token session is present.
     * @returns {boolean} Returns True when a token is present.
     */
    static hasSession() {
        return !!localStorage.getItem(TOKEN_KEY);
    }

    /**
     * Clear the session token.
     */
    static clear() {
        localStorage.removeItem(TOKEN_KEY);
    }

    /**
     * Get a Bearer Auth Header for make HTTP requests.
     * @returns {string} An authorization header.
     */
    static getAuthHeader() {
        return `Bearer ${TokenService.getToken()}`;
    }
}
