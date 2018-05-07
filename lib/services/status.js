const {AUTH_ENDPOINT} = process.env;
const authEndpoint = AUTH_ENDPOINT.endsWith('/') ? AUTH_ENDPOINT : `${AUTH_ENDPOINT}/`;
const request = require('request');

const makeRequest = url => new Promise(
    (resolve, reject) => request.get(
        {url: authEndpoint + url, json: true},
        (err, response) => {
            if (err) {
                return reject(err);
            }
            resolve(response.body);
        }
    )
);

module.exports = class StatusService {
    /**
     * Makes a ping to the IdP
     * @returns {Promise<any>} A promise with the ping response.
     */
    static ping() {
        return makeRequest('ping');
    }

    /**
     * Fetch the status API
     * @returns {Promise<any>} A promise with the IdP status.
     */
    static fetchReady() {
        return makeRequest('ready');
    }

    /**
     * Fetch the health state of the IdP
     * @returns {Promise<any>} A promise with the IdP health.
     */
    static fetchHealth() {
        return makeRequest('health');
    }
};
