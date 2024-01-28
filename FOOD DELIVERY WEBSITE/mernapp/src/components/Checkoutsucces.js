import React from 'react';
import { Link } from 'react-router-dom';

const Checkoutsucces = () => {
  const successPageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8faf5',
  };

  const successCardStyle = {
    background: 'white',
    padding: '60px',
    borderRadius: '4px',
    boxShadow: '0 2px 3px #c8d0d8',
    textAlign: 'center',
  };

  const successIconStyle = {
    color: '#9abc66',
    fontSize: '100px',
    marginBottom: '20px',
  };

  const successHeadingStyle = {
    color: '#88b04b',
    fontFamily: 'Nunito Sans',
    fontWeight: '900',
    fontSize: '40px',
    marginBottom: '10px',
  };

  const successMessageStyle = {
    color: '#404f5e',
    fontFamily: 'Nunito Sans',
    fontSize: '20px',
    margin: '0',
  };

  return (
    <div style={successPageStyle}>
      <div style={successCardStyle}>
        <div style={successIconStyle}>
          <i className="fas fa-check"></i>
        </div>
        <h1 style={successHeadingStyle}>Success!</h1>
        <p style={successMessageStyle}>
          We received your purchase request;<br /> we'll be in touch shortly!
        </p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ marginTop: '20px', padding: '10px 20px' }}>
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkoutsucces;
