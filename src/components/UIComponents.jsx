// src/components/UIComponents.jsx
import React from 'react';

export function Button({ children, onClick, className = '' }) {
  return (
    <button onClick={onClick} className={`custom-button ${className}`}>
      {children}
    </button>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`custom-card ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`custom-card-content ${className}`}>
      {children}
    </div>
  );
}