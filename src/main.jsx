/**
 * ===============================================================
 * Conor Steward
 * 11/04/2024
 * Speech To Text
 * 1conorsteward@gmail.com
 * Issues: No known issues.
 * 
 * File: index.js
 * Description: This is the entry point for the React application. 
 * It renders the root React component (`App`) into the DOM and 
 * applies strict mode to enforce best practices and identify 
 * potential issues in the application.
 * ===============================================================
 */

import { StrictMode } from 'react'; // Enables strict mode for better error handling and debugging
import { createRoot } from 'react-dom/client'; // Provides a modern API for rendering React components into the DOM
import './index.css'; // Imports the global CSS file for styling
import App from './App.jsx'; // Imports the main React component for the application

/**
 * Mounts the React application into the root element in the DOM.
 * - `createRoot`: Initializes the root of the React tree.
 * - `render`: Renders the `App` component within `StrictMode`.
 *   - `StrictMode`: Helps catch potential problems in an application by enforcing additional checks.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
