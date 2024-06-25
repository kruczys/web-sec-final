import React, { useEffect, useState } from 'react';
import { useKeycloak } from "@react-keycloak/web";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const { keycloak } = useKeycloak();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3001/public');
        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        } else {
          console.error('Failed to fetch movies');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!keycloak.authenticated) {
      alert("Please log in to add a movie.");
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/public/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, rating })
      });
      if (response.ok) {
        const newMovie = await response.json();
        setMovies([...movies, newMovie]);
        setTitle('');
        setRating('');
      } else {
        console.error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-green-800 text-4xl font-bold mb-6">Welcome to the Movies Page</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-gray-800 text-2xl font-semibold mb-4">Movies List:</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg mb-6">
          {movies.map(movie => (
            <li key={movie.id}>
              <strong>{movie.title}</strong> - Rating: {movie.rating}
            </li>
          ))}
        </ul>
        {keycloak.authenticated ? (
          <>
            <h2 className="text-gray-800 text-2xl font-semibold mb-4">Add a new movie:</h2>
            <form onSubmit={handleAddMovie} className="mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                  Rating:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="rating"
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
              </div>
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="submit"
              >
                Add Movie
              </button>
            </form>
          </>
        ) : (
          <p className="text-gray-700 text-lg">Please log in to add a movie.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;