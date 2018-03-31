/* global window */
/* eslint no-unused-vars: 0 */
import React from 'react';
import LoginService from './login';
import loginImage from './images/login.png';

const handleClick = async () => {
    const endpoint = 'https://7795f05f.ngrok.io';
    const authUri = 'public-api/signIn';
    const success = await(new LoginService(endpoint, authUri)).login();
    if (success) {
        window.location = '/back';
    }
};

const LoginButton = () => (
    <button onClick={() => handleClick()} className="btn btn-bifrost">
        <span className="btn-bifrost-image">
            <img src={loginImage}/>
        </span>
        <span className="btn-bifrost-text">Ingresar</span>
    </button>
);

export default LoginButton;
