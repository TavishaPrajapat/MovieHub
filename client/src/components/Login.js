// Import necessary libraries and hooks
import React, { useState, useContext } from 'react'; // Import React, useState, and useContext hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { AuthContext } from '../context/AuthContext'; // Import AuthContext for authentication functionality
import './style.css'; // Import CSS styles for the component

const Login = () => { 
  // Define the Login component
  const [email, setEmail] = useState(''); 
  // State to store the user's email
  const [password, setPassword] = useState(''); 
  // State to store the user's password
  const { login } = useContext(AuthContext); 
  // Use AuthContext to get the login function
  const navigate = useNavigate(); 
  // Hook for navigation

  const handleSubmit = async (e) => { 
    // Function to handle form submission
    e.preventDefault(); 
    // Prevent default form submission behavior

    try {
      const success = await login(email, password); 
      // Attempt login with email and password
      if (success) {
        navigate('/'); 
        // Redirect to home page if login is successful
      } else {
        alert('Login failed, please check your credentials.'); 
        // Show an alert if login fails
      }
    } catch (error) {
      console.error('Login Error:', error); 
      // Log any error that occurs during login
      alert('An error occurred during login. Please try again.'); 
      // Show an alert for unexpected errors
    }
  };

  const handleGoogleLogin = () => { 
    // Function to handle Google login
    window.location.href = 'http://localhost:5000/auth/google'; 
    // Redirect to the backend route for Google login
  };

  return (
    <div className="login-container"> 
      {/* Container for the login page */}
      <div className="login-card"> 
        {/* Card-style container for login form */}
        <h2 className="login-title">Login</h2> 
        {/* Title for the login form */}
        <form onSubmit={handleSubmit}> 
          {/* Form with submit handler */}
          <div className="input-group"> 
            {/* Input group for email */}
            <input
              type="email" 
              // Input type for email
              value={email} 
              // Bind input value to email state
              onChange={(e) => setEmail(e.target.value)} 
              // Update email state on input change
              placeholder="Email" 
              // Placeholder text for input
              className="input-field" 
              // Apply styles to the input field
              required 
              // Make input field mandatory
            />
          </div>
          <div className="input-group"> 
            {/* Input group for password */}
            <input
              type="password" 
              // Input type for password
              value={password} 
              // Bind input value to password state
              onChange={(e) => setPassword(e.target.value)} 
              // Update password state on input change
              placeholder="Password" 
              // Placeholder text for input
              className="input-field" 
              // Apply styles to the input field
              required 
              // Make input field mandatory
            />
          </div>
          <button type="submit" className="submit-button">Login</button> 
          {/* Submit button for login */}
        </form>
        <div className="google-login"> 
          {/* Section for Google login button */}
          <button onClick={handleGoogleLogin} className="google-button"> 
            {/* Button for Google login */}
            Login with Google 
            {/* Text for Google login button */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 
// Export Login component to be used in other parts of the application
