const {AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_ENDPOINT, GRANT_TYPE} = process.env;
const request = require('request');
const authEndpoint = AUTH_ENDPOINT.endsWith('/') ? AUTH_ENDPOINT : `${AUTH_ENDPOINT}/`;

let _token = 'undefined';

const refreshToken = () => new Promise((resolve, reject) => request.post({
    url: `${authEndpoint}oauth/token`,
    body: {
        client_id: AUTH_CLIENT_ID,
        client_secret: AUTH_CLIENT_SECRET,
        grant_type: GRANT_TYPE
    },
    json: true
}, (err, response) => {
    if (err) {
        return reject(err);
    }
    if (!response.body.token) {
        return reject(response);
    }
    resolve(response.body.token);
}));

const send = options => new Promise((resolve, reject) => {
    options.json = true;
    options.headers = {Authorization: `Bearer ${_token}`};
    request(options, (err, response) => {
        if (err) {
            return reject(err);
        }
        resolve(response);
    });
});

const sendAndRetry = options => send(options).then(
    response => {
        if (response.statusCode === 403) {
            return refreshToken().then(token => {
                _token = token;
                return send(options);
            });
        }
        return response;
    }
);

module.exports.get = (url, qs) => sendAndRetry({
    url: `${authEndpoint}oauth/${url}`,
    method: 'GET',
    qs
});

module.exports.post = (url, body) => sendAndRetry({
    url: `${authEndpoint}oauth/${url}`,
    method: 'POST',
    body
});

module.exports.put = (url, body) => sendAndRetry({
    url: `${authEndpoint}oauth/${url}`,
    method: 'PUT',
    body
});

module.exports.del = url => sendAndRetry({
    url: `${authEndpoint}oauth/${url}`,
    method: 'DELETE'
});

/**
 * Returns the actual token.
 * @returns {string} The actual authorization token.
 */
module.exports.getToken = () => _token;

/**
 * Set the authorization token.
 * @param {String} token new authorization token.
 * @returns {String} the given token.
 */
module.exports.setToken = token => _token = token;
