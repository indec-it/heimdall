/* global window */
/* eslint no-unused-vars: 0 */
import React from 'react';
import {Button} from 'react-bootstrap';
import LoginService from './login';

const handleClick = async () => {
    const endpoint = 'https://7795f05f.ngrok.io';
    const authUri = 'public-api/signIn';
    const success = await(new LoginService(endpoint, authUri)).login();
    if (success) {
        window.location = '/back';
    }
};

const LoginButton = () => (
    <Button
        bsStyle="primary"
        bsSize="lg"
        onClick={() => handleClick()}
    >
        Log InS
    </Button>
);

export default LoginButton;
