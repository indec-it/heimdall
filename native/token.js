import {AsyncStorage} from 'react-native';

const TOKEN_KEY = 'id_token';

export default class TokenService {
    /**
     * Store the session token
     * @param {string} token A token to be saved.
     * @returns {Promise<void>} Returns a promise when is saved.
     */
    static async setToken(token) {
        return AsyncStorage.setItem(TOKEN_KEY, token);
    }

    /**
     * Get the session token.
     * @returns {Promise<string>} Returns the current session token.
     */
    static async getToken() {
        return AsyncStorage.getItem(TOKEN_KEY);
    }

    /**
     * Check if a token session is present.
     * @returns {Promise<boolean>} Returns True when a token is present.
     */
    static async hasSession() {
        return !!await AsyncStorage.getItem(TOKEN_KEY);
    }

    /**
     * Clear the session token.
     * @returns {Promise<void>} Returns a promise when is completed.
     */
    static async clear() {
        return AsyncStorage.removeItem(TOKEN_KEY);
    }

    /**
     * Get a Bearer Auth Header for make HTTP requests.
     * @returns {Promise<string>} An authorization header.
     */
    static async getAuthHeader() {
        return `Bearer ${await TokenService.getToken()}`;
    }
}
