// Loader.js
import React from 'react';
import './Loader.css'; // Import a CSS file for styling

const Loader = () => {
  return (
    <div className="loader">
      {/* You can use an SVG spinner or any other animation */}
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
