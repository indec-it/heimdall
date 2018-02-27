/* global fetch */
import {Http} from "@indec/heimdall/client/index";

const getCookie = async token => {
    const {success} = await Http.post('public-api/signIn', {token});
    console.log(success);
    return success;
}

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
    login() {
        return new Promise((resolve, reject) => {
            const popup = window.open(`${this.endpoint}/loki?redirectUri=${window.location.host}`, "Heimdall", "width=600,height=400");
            window.addEventListener('message', async e => {
                const token = e.data.token;
                if (token) {
                    await getCookie(token);
                    resolve(token);

                } else {
                    reject(err);
                }
            }, false);
            if (window.focus) {
                popup.focus()
            }
        });
    }

}

