import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import keycloak from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';

ReactDOM.render(
    <ReactKeycloakProvider authClient={keycloak} initOptions={{
        checkLoginIframe: false,
          }}>
        <App />
    </ReactKeycloakProvider>,
    document.getElementById('root')
);