import React, { useState } from 'react'; // Import React library and the useState hook for managing state
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for programmatic navigation

// Define the Register component
const Register = () => {
  // Declare state variables for form fields with initial empty values
  const [name, setName] = useState(''); // State to hold the user's name
  const [email, setEmail] = useState(''); // State to hold the user's email
  const [password, setPassword] = useState(''); // State to hold the user's password

  // Initialize useNavigate hook for navigation after successful registration
  const navigate = useNavigate();

  /**
   * Handles form submission when the user attempts to register.
   * Sends the form data (name, email, and password) to the server for registration.
   * Displays appropriate alerts based on success or error.
   * @param {Event} e - The form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)

    try {
      // Send a POST request to the backend API with user-provided registration data
      await axios.post('http://localhost:5000/api/register', { name, email, password });

      // Notify the user of successful registration
      alert('Registration successful! Please log in.');

      // Redirect the user to the login page
      navigate('/login');
    } catch (error) {
      // Handle any errors that occur during the registration process
      console.error('Registration error:', error.response.data.message); // Log the error for debugging purposes
      alert(`Registration failed: ${error.response.data.message}`); // Show an error message to the user
    }
  };

  return (
    <div className="register-container">
      {/* Card-style container for the registration form */}
      <div className="register-card">
        <h2 className="register-title">Register</h2> {/* Form title */}

        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          {/* Input field for name */}
          <div className="input-group">
            <input
              type="text" // Specify input type as text
              value={name} // Bind the input value to the name state
              onChange={(e) => setName(e.target.value)} // Update state on input change
              placeholder="Name" // Placeholder text displayed when input is empty
              className="input-field" // Add CSS class for styling
              required // Mark the field as required
            />
          </div>

          {/* Input field for email */}
          <div className="input-group">
            <input
              type="email" // Specify input type as email
              value={email} // Bind the input value to the email state
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
              placeholder="Email" // Placeholder text displayed when input is empty
              className="input-field" // Add CSS class for styling
              required // Mark the field as required
            />
          </div>

          {/* Input field for password */}
          <div className="input-group">
            <input
              type="password" // Specify input type as password for secure input
              value={password} // Bind the input value to the password state
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              placeholder="Password" // Placeholder text displayed when input is empty
              className="input-field" // Add CSS class for styling
              required // Mark the field as required
            />
          </div>

          {/* Submit button for the form */}
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register; // Export the Register component for use in other parts of the application
