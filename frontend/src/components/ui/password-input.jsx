'use client';

import React, { useState } from 'react';

export const PasswordInput = React.forwardRef(({ className, ...props }, ref) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  return (
    <div className={`relative ${className}`}>
      {/* Input Field */}
      <input
        ref={ref}
        type={isPasswordVisible ? 'text' : 'password'}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
      {/* Show/Hide Button */}
      <button
        type="button"
        className="absolute inset-y-0 right-0 px-3 text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? 'Hide' : 'Show'}
      </button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
