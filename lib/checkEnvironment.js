const {forEach, isNil, isString} = require('lodash');

const environmentVariables = ['AUTH_ENDPOINT', 'AUTH_CLIENT_ID', 'AUTH_CLIENT_SECRET', 'GRANT_TYPE'];

forEach(environmentVariables, envVariable => {
    const envValue = process.env[envVariable];
    if (isNil(envValue)) {
        throw new Error(`Heimdall: ${envVariable} is not defined in process.env.`);
    }
    if (!isString(envValue)) {
        throw new Error(`Heimdall: process.env.${envVariable} is not string.`);
    }
});
