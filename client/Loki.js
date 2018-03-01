/* global window */
/* eslint no-unused-vars: 0 */
import React from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import LoginService from './login';

const handleClick = async (endpoint, authUri, redirectUri) => {
    const success = await(new LoginService(endpoint, authUri)).login();
    if (success) {
        window.location = redirectUri;
    }
};

const Loki =  ({loginParams: {endpoint, authUri, redirectUri}}) => (
    <Grid>
        <Row>
            <Col md={4} mdOffset={4}>
                <Button
                    bsStyle="primary"
                    bsSize="lg"
                    onClick={() => handleClick(endpoint, authUri, redirectUri)}
                >
                    Log In
                </Button>
            </Col>
        </Row>
    </Grid>
);

export default Loki;
