import React from 'react'; // Import the React library to build components
import ReactDOM from 'react-dom/client'; // Import ReactDOM to render the app into the DOM
import './index.css'; // Import the CSS file to apply styles globally
import App from './App'; // Import the App component, which is the root component of the app
import reportWebVitals from './reportWebVitals'; // Import the reportWebVitals function to measure performance

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root element to attach the React app to the DOM
root.render( // Render the app inside the root element
  <React.StrictMode> {/* Wrap the app in React.StrictMode to help identify potential problems */}
    <App /> {/* Render the App component */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log)) 
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // Call the reportWebVitals function to measure performance if needed
