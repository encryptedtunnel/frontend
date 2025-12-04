import React, { Children } from 'react'

export default function SecondaryButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="btn-secondary"
    >
      {children}
    </button>
  );
}