const request = require('../request');
const ENDPOINT = 'email/';

module.exports = class EmailService {
    /**
     * Send an email.
     * @param {String} to Recipient of the email.
     * @param {String} subject Subject of the email.
     * @param {String} message The HTML message of the email.
     * @returns {Promise<any>} A promise with the result of send email.
     */
    static send(to, subject, message) {
        return request.post(ENDPOINT, {to, subject, message});
    }
};
