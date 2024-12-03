import { render, screen } from '@testing-library/react'; // Importing necessary functions from React Testing Library: render for rendering components, and screen for querying DOM elements
import App from './App'; // Importing the App component to be tested

test('renders learn react link', () => { // Defining a test case with a descriptive name: checking if a "learn react" link is rendered
  render(<App />); // Rendering the App component for testing
  const linkElement = screen.getByText(/learn react/i); // Querying the document for an element with the text "learn react" (case-insensitive)
  expect(linkElement).toBeInTheDocument(); // Asserting that the linkElement is present in the document
}); 
