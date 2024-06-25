import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Secured = () => {
  const { keycloak } = useKeycloak();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (keycloak.authenticated) {
        try {
          const info = await keycloak.loadUserInfo();
          setUserInfo(info);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };
    fetchUserInfo();
  }, [keycloak]);

  if (!keycloak.authenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-gray-700 text-lg">Please log in to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-green-800 text-4xl font-bold mb-6">Welcome to the Account Info Page</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {userInfo ? (
          <div>
            <h2 className="text-gray-800 text-2xl font-semibold mb-4">User Information:</h2>
            <p className="text-gray-700 text-lg mb-2"><strong>Username:</strong> {userInfo.preferred_username}</p>
            <p className="text-gray-700 text-lg mb-2"><strong>Email:</strong> {userInfo.email}</p>
            <p className="text-gray-700 text-lg mb-2"><strong>Name:</strong> {userInfo.name}</p>
            <p className="text-gray-700 text-lg mb-2"><strong>Given Name:</strong> {userInfo.given_name}</p>
            <p className="text-gray-700 text-lg mb-2"><strong>Family Name:</strong> {userInfo.family_name}</p>
          </div>
        ) : (
          <p className="text-gray-700 text-lg">Loading user information...</p>
        )}
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" 
          onClick={() => keycloak.logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Secured;