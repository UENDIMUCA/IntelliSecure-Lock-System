import React from 'react';
import { useController } from 'react-hook-form';

// Basic form wrapper
export const Form = ({ children, ...props }) => (
  <form {...props}>{children}</form>
);

// Wrapper for form controls
export const FormControl = ({ children }) => (
  <div className="form-control">{children}</div>
);

// Wrapper for individual form fields
export const FormField = ({ control, name, render }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name }); // Proper field control
  return render({ field, error });
};

// Wrapper for form items
export const FormItem = ({ children }) => (
  <div className="form-item">{children}</div>
);

// Wrapper for labels
export const FormLabel = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="form-label">
    {children}
  </label>
);

// Wrapper for error messages
export const FormMessage = ({ children }) => (
  <p className="form-message">{children}</p>
);
