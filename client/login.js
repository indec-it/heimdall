/* global window */
import {Http} from '@indec/heimdall/client';


const getCookie = async (appAuthUrl, code) => Http.post(appAuthUrl, {code});

/**
 * Manage login with the identity provider.
 */
export default class LoginService {
    constructor(endpoint,authUri) {
        this.endpoint= endpoint;
        this.authUri = authUri;
    }

    /**
     * Opens a login popup using the identity provider.
     * @returns {Promise<string>} A promise with the new session token.
     */
    login() {
        return new Promise((resolve, reject) => {
            const popup = window.open(`${this.endpoint}/loki?redirectUri=${window.location.host}`, 'Heimdall', 'width=600,height=400');
            window.addEventListener('message', async e => {
                const {code} = e.data;
                if (code) {
                    await getCookie(this.authUri, code);
                    return resolve(code);
                }
                reject();
            }, false);
            if (window.focus) {
                popup.focus();
            }
        });
    }
}
