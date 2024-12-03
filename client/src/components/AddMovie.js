import React, { useState } from 'react'; // Importing React and useState hook for managing state
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import './style.css';  // Importing the custom CSS for styling

const AddMovie = () => { // Declaring the AddMovie functional component
  const [title, setTitle] = useState(''); // State for storing the movie title
  const [description, setDescription] = useState(''); // State for storing the movie description
  const [image, setImage] = useState(null);  // State for storing the selected image file
  const [review, setReview] = useState('');  // State for storing the movie review
  const [rating, setRating] = useState('');  // State for storing the movie rating
  const [error, setError] = useState(''); // State for storing any error message
  const navigate = useNavigate(); // Using useNavigate hook for programmatic navigation

  const handleSubmit = async (e) => { // Function to handle form submission
    e.preventDefault(); // Preventing the default form submission behavior
    setError(''); // Clearing any previous error message

    const formData = new FormData(); // Creating a new FormData object to send data
    formData.append('title', title); // Appending the movie title to FormData
    formData.append('description', description); // Appending the movie description to FormData
    formData.append('review', review); // Appending the movie review to FormData
    formData.append('rating', rating); // Appending the movie rating to FormData

    if (image) {// Checking if an image is selected
      formData.append('image', image);  // Append the image file to FormData
    }

    try { // Try block to handle the form submission
      const response = await axios.post( // Sending a POST request to the server
        'http://localhost:5000/api/movies', // API endpoint for adding a movie
        formData, // Sending the formData object
        {
          withCredentials: true, // Including credentials for authentication
          headers: { 'Content-Type': 'multipart/form-data' }, // Setting the Content-Type header
        }
      );
      console.log('Movie added:', response.data); // Logging the success response
      navigate('/'); // Redirecting to the homepage after successful submission
    } catch (error) { // Catch block to handle errors
      console.error('Error adding movie:', error); // Logging the error
      setError(error.response?.data?.message || 'Failed to add movie. Please try again.'); // Setting the error message
    }
  };


  return (// JSX to render the component
<div className="add-movie-container">
  <div className="add-movie-card">
    <h2 className="add-movie-title">Add New Movie</h2>
    {error && <p className="add-movie-error">{error}</p>}
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="add-movie-form-group">
        <label htmlFor="title" className="add-movie-label">Name:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="add-movie-input"
        />
      </div>
      <div className="add-movie-form-row">
        <div className="add-movie-form-group">
          <label htmlFor="description" className="add-movie-label">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="add-movie-textarea"
          ></textarea>
        </div>
        <div className="add-movie-form-group">
          <label htmlFor="review" className="add-movie-label">Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            className="add-movie-textarea"
            placeholder="Write your review here"
          ></textarea>
        </div>
      </div>
      <div className="add-movie-form-row">
      <div className="add-movie-form-group">
        <label htmlFor="rating" className="add-movie-label">Rating (1-5):</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
          className="add-movie-input"
          placeholder="Rate the movie (1-5)"
        />
      </div>
      <div className="add-movie-form-group">
        <label htmlFor="image" className="add-movie-label">Movie Image:</label>
        <input
          type="file"
          id="image"
          required
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          className="add-movie-file-input"
        />
      </div>
      </div>
      <button type="submit" className="add-movie-button">
        Add Movie
      </button>
    </form>
  </div>
</div>
  );
};

export default AddMovie;// Exporting the AddMovie component