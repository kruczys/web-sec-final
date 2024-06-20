import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import keycloak from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';

const eventLogger = (event, error) => {
    console.log('onKeycloakEvent', event, error);
};

const tokenLogger = (tokens) => {
    console.log('onKeycloakTokens', tokens);
};

ReactDOM.render(
    <ReactKeycloakProvider
        authClient={keycloak}
        onEvent={eventLogger}
        onTokens={tokenLogger}
    >
        <App />
    </ReactKeycloakProvider>,
    document.getElementById('root')
);
