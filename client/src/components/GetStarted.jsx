import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GetStarted.css';

const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <div className="get-started">
      <h1>Welcome to Our Shop!</h1>
      <button onClick={() => navigate('/login')} className="btn">
        Get Started
      </button>
    </div>
  );
};

export default GetStarted;
