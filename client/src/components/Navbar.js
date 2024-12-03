import React, { useContext } from 'react'; // Importing React and the useContext hook for state management
import { Link, useNavigate } from 'react-router-dom'; // Importing Link for navigation and useNavigate for programmatic navigation
import { AuthContext } from '../context/AuthContext'; // Importing the AuthContext to access authentication-related data and functions

const Navbar = () => { // Defining the Navbar component
  const { user, logout } = useContext(AuthContext); // Destructuring the user and logout function from AuthContext
  const navigate = useNavigate(); // Initializing the useNavigate hook for redirecting users

  const handleLogout = async () => { // Defining an async function to handle user logout
    await logout(); // Calling the logout function from the AuthContext
    navigate('/login'); // Redirecting the user to the login page after logout
  };

  return ( // Returning the JSX structure of the Navbar component
    <nav className="bg-gray-800 p-4"> {/* Defining a navigation bar with styling */}
      <div className="container mx-auto flex justify-between items-center"> {/* A flex container to align items within the navbar */}
        <Link to="/" className="text-white text-2xl font-bold">Movie Recommendations</Link> {/* A link to the home page with styled text */}
        <div> {/* Wrapper for navigation links and buttons */}
          {user ? ( // Conditional rendering: if a user is logged in
            <> {/* Fragment for grouping multiple elements */}
              <Link to="/" className="text-white mr-4">Home</Link> {/* Link to the home page */}
              <Link to="/add-movie" className="text-white mr-4">Add Movie</Link> {/* Link to the add movie page */}
              <button onClick={handleLogout} className="text-white">Logout</button> {/* Button to trigger logout */}
            </>
          ) : ( // Else: if no user is logged in
            <> {/* Fragment for grouping multiple elements */}
              <Link to="/login" className="text-white mr-4">Login</Link> {/* Link to the login page */}
              <Link to="/register" className="text-white">Register</Link> {/* Link to the register page */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; // Exporting the Navbar component for use in other parts of the application
