import React, { useState, useEffect, useContext } from 'react'; // Import necessary React hooks and Context API
import axios from 'axios'; // Import axios for making HTTP requests
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks for route parameters and navigation
import { AuthContext } from '../context/AuthContext'; // Import AuthContext for managing authentication state

const EditMovie = () => {
  // State variables for managing form data and loading/error states
  const [title, setTitle] = useState(''); // State for movie title
  const [description, setDescription] = useState(''); // State for movie description
  const [review, setReview] = useState(''); // State for movie review
  const [rating, setRating] = useState(1); // State for movie rating, default value 1
  const [image, setImage] = useState(null); // State for new image file
  const [currentImage, setCurrentImage] = useState(''); // State for the current movie image URL
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error messages
  const { id } = useParams(); // Extract movie ID from the route parameters
  const navigate = useNavigate(); // Navigate to different routes
  const { user } = useContext(AuthContext); // Get the logged-in user from AuthContext

  useEffect(() => {
    // Change the background color of the page when this component mounts
    document.body.style.backgroundColor = '#153448';

    // Redirect to login page if user is not authenticated
    if (!user) {
      navigate('/login');
      return;
    }

    // Function to fetch the movie data from the API
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/movies/${id}`, { withCredentials: true });
        setTitle(res.data.title); // Set the movie title
        setDescription(res.data.description); // Set the movie description
        setReview(res.data.review || ''); // Set the movie review
        setRating(res.data.rating || 1); // Set the movie rating
        setCurrentImage(res.data.image || ''); // Set the current image URL
      } catch (error) {
        console.error('Error fetching movie:', error); // Log the error to the console
        setError('Failed to fetch movie data.'); // Set the error message
        navigate('/'); // Redirect to the home page if fetching fails
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchMovie(); // Fetch the movie data on component mount

    // Cleanup function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = ''; // Reset the background color
    };
  }, [id, user, navigate]); // Dependencies for useEffect

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImage(file); // Set the new image file in state
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate required fields
    if (!title || !description || !review || !rating) {
      setError('Title, description, review, and rating are required.');
      return;
    }

    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append('title', title); // Add title to form data
    formData.append('description', description); // Add description to form data
    formData.append('review', review); // Add review to form data
    formData.append('rating', rating); // Add rating to form data
    if (image) {
      formData.append('image', image); // Add new image file if provided
    }

    try {
      // Send a PUT request to update the movie
      const res = await axios.put(
        `http://localhost:5000/api/movies/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for file uploads
          },
          withCredentials: true, // Include credentials (e.g., cookies)
        }
      );

      if (res.status === 200) {
        navigate('/'); // Redirect to home page after successful update
      }
    } catch (error) {
      console.error('Error updating movie:', error); // Log the error to the console

      // Handle unauthorized updates
      if (error.response && error.response.status === 403) {
        setError('You are not authorized to update this movie.');
        navigate(`/movie/${id}`, { state: { errorMessage: 'You are not authorized to update this movie.' } });
      } else {
        setError('Failed to update movie.'); // Set the error message for other errors
      }
    }
  };

  // Inline styles for different elements
  const containerStyle = {
    maxWidth: '1500px',
    margin: '2rem auto',
    padding: '4rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'row', // Row layout for left and right sections
    gap: '2rem',
  };

  const formTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '1.5rem',
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  };

  const formInputStyle = {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    border: '1px solid #dcdcdc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const formTextareaStyle = {
    width: '100%',
    minHeight: '120px',
    padding: '1rem',
    fontSize: '1rem',
    border: '1px solid #dcdcdc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    resize: 'none',
  };

  const formSelectStyle = {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    border: '1px solid #dcdcdc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const formButtonStyle = {
    padding: '1rem',
    backgroundColor: '#3C5B6F',
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const formButtonHoverStyle = {
    backgroundColor: '#346da3',
  };

  const errorStyle = {
    color: '#f8d7da', // Light red text color for error messages
    backgroundColor: '#070F2B', // Deep blue background
    border: '1px solid #1B1A55', // Darker blue border for the error message
    padding: '1rem',
    borderRadius: '8px',
    marginTop: '1rem',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const loadingStyle = {
    color: '#333',
    textAlign: 'center',
    fontSize: '1.5rem',
  };

  const moviePosterStyle = {
    maxWidth: '500px',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  if (loading) {
    // Show a loading spinner while data is being fetched
    return <div style={loadingStyle}>Loading...</div>;
  }

  if (error) {
    // Show error message if there's an error
    return <div style={errorStyle}>{error}</div>;
  }

  return (
    <div style={containerStyle}>
      {/* Left Column: Display the movie poster */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {currentImage && (
          <img src={currentImage} alt="Movie Poster" style={moviePosterStyle} />
        )}
      </div>

      {/* Right Column: Display the edit form */}
      <div style={{ flex: 2 }}>
        <h2 style={formTitleStyle}>Edit Movie</h2>
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div style={formGroupStyle}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={formInputStyle}
              placeholder="Enter movie title"
              required
            />
          </div>

          {/* Description Input */}
          <div style={formGroupStyle}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={formTextareaStyle}
              placeholder="Enter movie description"
              required
            />
          </div>

          {/* Review Input */}
          <div style={formGroupStyle}>
            <label htmlFor="review">Review</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              style={formTextareaStyle}
              placeholder="Write your review"
              required
            />
          </div>

          {/* Rating Dropdown */}
          <div style={formGroupStyle}>
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              style={formSelectStyle}
              required
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div style={formGroupStyle}>
            <label htmlFor="image">Movie Poster</label>
            <input
              id="image"
              type="file"
              onChange={handleImageChange}
              style={formInputStyle}
            />
          </div>

          {/* Submit Button */}
          <div style={formGroupStyle}>
            <button
              type="submit"
              style={{ ...formButtonStyle, ...formButtonHoverStyle }}
            >
              Update Movie
            </button>
          </div>

          {/* Error Message */}
          {error && <div style={errorStyle}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default EditMovie;

