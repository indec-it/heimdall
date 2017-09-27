const {AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_ENDPOINT, GRANT_TYPE} = process.env;
const request = require('request');

let _token = 'undefined';

const refreshToken = () => new Promise((resolve, reject) => request.post({
    url: `${AUTH_ENDPOINT}oauth/token`,
    body: {
        client_id: AUTH_CLIENT_ID,
        client_secret: AUTH_CLIENT_SECRET,
        grant_type: GRANT_TYPE
    },
    json: true
}, (err, response) => {
    if (err) {
        reject(err);
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
    url: `${AUTH_ENDPOINT}oauth/${url}`,
    method: 'GET',
    qs
});

module.exports.post = (url, body) => sendAndRetry({
    url: `${AUTH_ENDPOINT}oauth/${url}`,
    method: 'POST',
    body
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
