/* global window */
import React from 'react';
import PropTypes from 'prop-types';

import LoginService from './login';
import loginImage from './images/login.png';
import logoIndec from './images/logoIndec.png';

const handleClick = async (endpoint, authUri, redirectUri) => {
    const success = await(new LoginService(endpoint, authUri)).login();
    if (success) {
        window.location = redirectUri;
    }
};

const Bifrost = ({logoApp, loginParams: {endpoint, authUri, redirectUri}}) => (
    <div className="bifrost">
        <div className="bifrost-sidebar">
            <img src={logoIndec}/>
        </div>
        <div className="bifrost-login">
            <h3>Factores de Riesgo</h3>
            {logoApp && <img src={logoApp}/>}
            <button onClick={() => handleClick(endpoint, authUri, redirectUri)} className="btn-bifrost">
                <span className="btn-bifrost-image">
                    <img src={loginImage}/>
                </span>
                <span className="btn-bifrost-text">Ingresar</span>
            </button>
        </div>
    </div>
);

Bifrost.propTypes = {
    logoApp: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Bifrost.defaultProps = {
    logoApp: null
}

export default Bifrost;
