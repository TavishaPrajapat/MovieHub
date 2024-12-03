// Import necessary libraries and hooks
import React, { useState, useEffect, useContext } from 'react'; // Import React and hooks for managing state, effects, and context
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // Import hooks for routing and navigation
import { AuthContext } from '../context/AuthContext'; // Import AuthContext to manage authentication
import './style.css'; // Import CSS for styling

const MovieDetail = () => { 
  // Define the MovieDetail component
  const [movie, setMovie] = useState(null); 
  // State to store movie details
  const [error, setError] = useState(null); 
  // State to store any errors
  const { user } = useContext(AuthContext); 
  // Access the current user from AuthContext
  const navigate = useNavigate(); 
  // Hook for navigation
  const { id } = useParams(); 
  // Get the movie ID from the URL
  const location = useLocation(); 
  // Access the current location and passed state

  useEffect(() => {
    fetchMovieDetail(); 
    // Fetch movie details when the component is mounted or the ID changes
  }, [id]); 
  // Dependency array ensures the effect runs when `id` changes

  const fetchMovieDetail = async () => { 
    // Function to fetch movie details
    try {
      const res = await axios.get(`http://localhost:5000/api/movies/${id}`, { withCredentials: true }); 
      // Make a GET request to fetch movie details
      setMovie(res.data); 
      // Update the state with the fetched data
    } catch (error) {
      setError('Error fetching movie details'); 
      // Set an error message if the request fails
      console.error('Error fetching movie details:', error); 
      // Log the error to the console
    }
  };

  const handleDelete = async () => { 
    // Function to handle movie deletion
    if (!user) { 
      // Check if the user is authenticated
      setError('You are not authorized to delete the movie'); 
      // Show an error message if the user is not authorized
      return; 
    }
    if (window.confirm('Are you sure you want to delete this movie?')) { 
      // Confirm with the user before deleting
      try {
        const response = await axios.delete(`http://localhost:5000/api/movies/${id}`, { withCredentials: true }); 
        // Make a DELETE request to remove the movie
        if (response.status === 200) { 
          // Check if the request was successful
          navigate('/'); 
          // Redirect to the home page after successful deletion
        }
      } catch (error) {
        setError('You are not authorized to delete this movie'); 
        // Set an error message if deletion fails
        console.error('Error deleting movie:', error); 
        // Log the error to the console
      }
    }
  };

  const handleEdit = () => { 
    // Function to handle editing the movie
    navigate(`/edit-movie/${id}`); 
    // Redirect to the edit movie page
  };

  return (
    <div className="movie-detail"> 
      {/* Container for the movie detail page */}

      {movie && ( 
        // Check if the movie data is available
        <div className="movie-container"> 
          {/* Container for the movie details */}
          <div className="movie-poster"> 
            {/* Section for displaying the movie poster */}
            <img
              src={movie.image || 'https://via.placeholder.com/300x450'} 
              // Display the movie image or a placeholder if none exists
              alt={movie.title} 
              // Alt text for the image
              className="movie-image" 
              // Apply CSS class for styling
            />
          </div>
          <div className="movie-content"> 
            {/* Section for displaying the movie content */}
            <h1>{movie.title}</h1> 
            {/* Display the movie title */}
            <p>{movie.description}</p> 
            {/* Display the movie description */}
            <div className="review"> 
              {/* Section for the review */}
              <p><strong>Review:</strong> {movie.review || 'No review available'}</p> 
              {/* Display the review or a placeholder */}
            </div>
            <div className="rating"> 
              {/* Section for the rating */}
              <p><strong>Rating:</strong> {movie.rating ? `${movie.rating} / 5` : 'No rating available'}</p> 
              {/* Display the rating or a placeholder */}
            </div>

            {error && <div className="error-message">{error}</div>} 
            {/* Display an error message if any */}
            {location.state?.errorMessage && ( 
              // Check if an error message is passed via location state
              <div className="error-message">{location.state.errorMessage}</div> 
              // Display the error message
            )}

            {user && ( 
              // Check if the user is authenticated
              <div className="button-container"> 
                {/* Container for action buttons */}
                <button className="edit-button" onClick={handleEdit}>Edit</button> 
                {/* Button to edit the movie */}
                <button className="delete-button" onClick={handleDelete}>Delete</button> 
                {/* Button to delete the movie */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail; 
// Export the MovieDetail component to be used elsewhere in the application
