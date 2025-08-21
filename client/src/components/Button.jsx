import React from "react";


const Button = ({ children, className = "", ...props }) => (
  <button
    className={`mt-2 bg-primary hover:bg-pink-800 text-white font-semibold px-15 py-2 rounded-full transition-colors duration-200 shadow-sm ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
