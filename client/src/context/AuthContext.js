import React, { createContext, useState, useEffect } from 'react'; // Importing React and necessary hooks (createContext, useState, useEffect)
import axios from 'axios'; // Importing axios for making HTTP requests

export const AuthContext = createContext(); // Creating an AuthContext to provide authentication state and functions

export const AuthProvider = ({ children }) => { // Defining the AuthProvider component that wraps the children components
  const [user, setUser] = useState(null); // Initializing user state to store the current authenticated user (initially null)
  const [loading, setLoading] = useState(true); // Initializing loading state to manage the loading status (initially true)

  useEffect(() => { // useEffect hook to run code on component mount (only once, because of the empty dependency array)
    const checkUser = async () => { // Defining an async function to check if a user is logged in
      try {
        const res = await axios.get('http://localhost:5000/api/user', { withCredentials: true }); // Making a GET request to check for a logged-in user, with credentials included in the request
        if (res.data) { // If response data exists (user is logged in)
          setUser(res.data); // Setting the user state with the fetched data
        }
      } catch (error) { // Handling any errors that may occur during the request
        console.error('Error fetching user:', error); // Logging the error to the console
      } finally { // Executing after the try/catch block, regardless of success or failure
        setLoading(false); // Setting loading state to false once the request is complete
      }
    };
    checkUser(); // Calling the checkUser function
  }, []); // Empty dependency array to ensure this effect runs only once when the component mounts

  const login = async (email, password) => { // Defining the login function that accepts email and password as parameters
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password }, { withCredentials: true }); // Making a POST request to login the user, with credentials included
      setUser(res.data.user); // Storing the logged-in user's data in the user state
      return true; // Returning true indicating successful login
    } catch (error) { // Handling errors during the login process
      console.error('Login error:', error); // Logging the error to the console
      return false; // Returning false to indicate failure
    }
  };

  const logout = async () => { // Defining the logout function
    try {
      await axios.get('http://localhost:5000/api/logout', { withCredentials: true }); // Making a GET request to log out the user, with credentials included
      setUser(null); // Resetting the user state to null to indicate the user is logged out
      return true; // Returning true to indicate successful logout
    } catch (error) { // Handling errors during the logout process
      console.error('Logout error:', error); // Logging the error to the console
      return false; // Returning false to indicate failure
    }
  };

  return ( // Returning the context provider component with the necessary values
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}> {/* Providing the user, loading, login, logout, and setUser to the children components */}
      {!loading && children} {/* Rendering children only if loading is false (to prevent rendering before user data is fetched) */}
    </AuthContext.Provider> // Wrapping children components with AuthContext.Provider
  );
};
