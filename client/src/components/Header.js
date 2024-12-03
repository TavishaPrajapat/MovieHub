// Import React and necessary hooks
import React, { useContext } from 'react'; // Import React and the useContext hook for accessing context
import { Link } from 'react-router-dom'; // Import Link for navigation between routes
import { AuthContext } from '../context/AuthContext'; // Import AuthContext for managing user authentication state
import './style.css'; // Import the stylesheet for styling
import cinemaLogo from '../components/cinema.png'; // Import the logo image

const Header = () => { 
  // Define the Header component
  const { user, logout } = useContext(AuthContext); 
  // Destructure the user object and logout function from AuthContext

  return (
    <header> 
      {/* Header element that wraps the navigation bar */}
      <nav> 
        {/* Navigation bar */}
        <div className="logo-container"> 
          {/* Container for the logo and site title */}
          <Link to="/"> 
            {/* Link to the home page */}
            <img src={cinemaLogo} alt="MovieHub Logo" className="logo-img" /> 
            {/* Display the site logo */}
          </Link>
          <span className="site-title">MovieHub</span> 
          {/* Display the site title next to the logo */}
        </div>
        
        <ul> 
          {/* Navigation links */}
          <li><Link to="/" className="nav-link">Home</Link></li> 
          {/* Link to the home page */}
          {user ? ( 
            // If the user is logged in, display these links
            <>
              <li><Link to="/add-movie" className="nav-link">Add Movie</Link></li> 
              {/* Link to the "Add Movie" page */}
              <li><button onClick={logout} className="btn-logout">Logout</button></li> 
              {/* Button to log out */}
            </>
          ) : ( 
            // If the user is not logged in, display these links
            <>
              <li><Link to="/login" className="nav-link">Login</Link></li> 
              {/* Link to the login page */}
              <li><Link to="/register" className="nav-link btn-register">Register</Link></li> 
              {/* Link to the register page */}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header; 
// Export the Header component for use in other parts of the app
