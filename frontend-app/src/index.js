import Keycloak from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';

const keycloakConfig = {
  url: 'http://localhost:8080/',
  realm: 'main',
  clientId: 'frontend',
};

const keycloak = new Keycloak(keycloakConfig);

const App = () => (
  <ReactKeycloakProvider authClient={keycloak}>
    <App />
  </ReactKeycloakProvider>
);

export default App;