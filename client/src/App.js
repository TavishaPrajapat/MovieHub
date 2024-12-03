import React from 'react'; // Importing React to use JSX and React features
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importing components from React Router for routing
import { AuthProvider } from './context/AuthContext'; // Importing the AuthProvider to provide authentication context to the app
import Header from './components/Header'; // Importing the Header component for the app's header section
import Home from './components/Home'; // Importing the Home component for the homepage route
import Login from './components/Login'; // Importing the Login component for the login route
import Register from './components/Register'; // Importing the Register component for the registration route
import AddMovie from './components/AddMovie'; // Importing the AddMovie component for the add movie route
import EditMovie from './components/EditMovie'; // Importing the EditMovie component for editing movie details
import MovieDetail from './components/MovieDetail'; // Importing the MovieDetail component for viewing individual movie details

function App() { // Defining the App component
  return (
    <AuthProvider> {/* Wrapping the app with AuthProvider to provide authentication context */}
      <Router> {/* Setting up Router to handle navigation and routing */}
        <div className="App"> {/* Main app container */}
          <Header /> {/* Rendering the Header component */}
          <main className="container mx-auto mt-4 px-4"> {/* Main content area with container styling */}
            <Routes> {/* Defining the routing rules */}
              <Route path="/" element={<Home />} /> {/* Route for the homepage */}
              <Route path="/login" element={<Login />} /> {/* Route for the login page */}
              <Route path="/register" element={<Register />} /> {/* Route for the register page */}
              <Route path="/add-movie" element={<AddMovie />} /> {/* Route for adding a movie */}
              <Route path="/edit-movie/:id" element={<EditMovie />} /> {/* Route for editing a movie, with dynamic id */}
              <Route path="/movie/:id" element={<MovieDetail />} /> {/* Route for viewing movie details, with dynamic id */}
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; // Exporting the App component as default for use in other parts of the application
