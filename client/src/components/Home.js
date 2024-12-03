// Import necessary libraries and hooks
import React, { useState, useEffect, useContext } from 'react'; // Import React, useState, useEffect, and useContext hooks
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { AuthContext } from '../context/AuthContext'; // Import AuthContext to get user authentication state
import './style.css'; // Import CSS styles

const Home = () => { 
  // Define the Home component
  const [movies, setMovies] = useState([]); 
  // State to store the list of movies
  const [error, setError] = useState(null); 
  // State to handle errors
  const [successMessage, setSuccessMessage] = useState(''); 
  // State to display success messages
  const { user } = useContext(AuthContext); 
  // Get the authenticated user from AuthContext
  const navigate = useNavigate(); 
  // Hook for navigation

  useEffect(() => { 
    // Hook to fetch movies when the component mounts
    fetchMovies(); 
    // Call fetchMovies function to load data
  }, []); 
  // Empty dependency array ensures this runs only once on mount

  const fetchMovies = async () => { 
    // Function to fetch movie data
    try {
      const res = await axios.get('http://localhost:5000/api/movies', { withCredentials: true }); 
      // Make a GET request to fetch movies with credentials
      setMovies(res.data); 
      // Store the fetched movies in state
    } catch (error) {
      setError('Error fetching movies'); 
      // Set an error message if fetching fails
      console.error('Error fetching movies:', error); 
      // Log the error to the console
    }
  };

  const handleLearnMore = (id) => { 
    // Function to navigate to a movie's detail page
    navigate(`/movie/${id}`); 
    // Navigate to the movie detail page with the movie's ID
  };

  const renderStars = (rating) => { 
    // Function to render star ratings
    const stars = []; 
    // Array to hold star symbols
    for (let i = 0; i < 5; i++) { 
      // Loop through 5 times for 5 stars
      stars.push(i < rating ? '⭐' : '☆'); 
      // Push a full star if within rating, otherwise an empty star
    }
    return stars.join(''); 
    // Join the array into a string and return
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '2rem' }}> 
      {/* Container with light background and padding */}
      <div className="header"> 
        {/* Header section */}
        <h1>Movie Recommendations & Reviews</h1> 
        {/* Page title */}
      </div>

      {error && ( 
        // Show error message if there's an error
        <div
          style={{
            backgroundColor: '#e53e3e', 
            // Red background for error
            color: 'white', 
            // White text color
            padding: '1rem', 
            // Padding around the error box
            marginBottom: '2rem', 
            // Margin below the error box
            borderRadius: '8px', 
            // Rounded corners
          }}
        >
          <strong>{error}</strong> 
          {/* Display the error message */}
        </div>
      )}

      {successMessage && ( 
        // Show success message if it exists
        <div
          style={{
            backgroundColor: '#38a169', 
            // Green background for success
            color: 'white', 
            // White text color
            padding: '1rem', 
            // Padding around the success box
            marginBottom: '2rem', 
            // Margin below the success box
            borderRadius: '8px', 
            // Rounded corners
          }}
        >
          <strong>{successMessage}</strong> 
          {/* Display the success message */}
        </div>
      )}

      <div className="movie-grid"> 
        {/* Movie grid container */}
        {movies.length === 0 ? ( 
          // If there are no movies
          <p
            style={{
              textAlign: 'center', 
              // Center align the text
              fontSize: '1.5rem', 
              // Larger font size
              color: '#4a5568', 
              // Gray color for the text
            }}
          >
            No movies available 
            {/* Message to display if no movies are available */}
          </p>
        ) : (
          movies.map((movie) => ( 
            // Map through movies to display each one
            <div className="movie-card" key={movie._id}> 
              {/* Movie card container with unique key */}
              <img
                src={movie.image || 'https://via.placeholder.com/280x420'} 
                // Movie image or a placeholder if no image exists
                alt={movie.title} 
                // Alt text for the image
                className="movie-image" 
                // Apply styles for movie image
              />
              <div className="movie-info"> 
                {/* Container for movie details */}
                <h2>{movie.title}</h2> 
                {/* Display movie title */}
                <p>{movie.description}</p> 
                {/* Display movie description */}
                <div>
                  {/* Section for review and rating */}
                  <strong>Review:</strong>
                  <p>{movie.review || 'No review available'}</p> 
                  {/* Display review or fallback message */}
                  <strong>Rating:</strong>
                  <p>{movie.rating ? renderStars(movie.rating) : 'No rating available'}</p> 
                  {/* Display rating as stars or fallback */}
                </div>
                <div className="button-container"> 
                  {/* Button container */}
                  <button
                    className="learn-more-button" 
                    // Button for "Learn More"
                    onClick={() => handleLearnMore(movie._id)} 
                    // Navigate to the movie's detail page on click
                  >
                    Learn More 
                    {/* Button text */}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home; 
// Export Home component to be used in other parts of the app
