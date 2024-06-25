import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-green-800 text-4xl font-bold mb-6">Welcome to MovieRater</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-gray-700 text-lg mb-4">
          MovieRater is a simple web application that allows users to view and rate movies.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          This project is built using:
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg mb-4">
          <li>React for the frontend</li>
          <li>Express.js for the backend</li>
          <li>Keycloak for secure authentication and authorization</li>
        </ul>
        <p className="text-gray-700 text-lg mb-4">
          With Keycloak integration, we ensure that user data is protected and only authenticated users can perform certain actions, such as adding new movie ratings.
        </p>
        <p className="text-gray-700 text-lg">
          Feel free to explore the Movies page to see the list of movies, and log in to add your own ratings!
        </p>
      </div>
    </div>
  );
};

export default Home;