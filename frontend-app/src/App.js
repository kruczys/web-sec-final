import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const App = () => {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {!keycloak.authenticated && (
                <button onClick={() => keycloak.login()}>Login</button>
            )}

            {keycloak.authenticated && (
                <div>
                    <button onClick={() => keycloak.logout()}>Logout</button>
                    <div>Welcome, {keycloak.tokenParsed.preferred_username}</div>
                </div>
            )}
        </div>
    );
};

export default App;
