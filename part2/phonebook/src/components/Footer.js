import React from 'react';

const Footer = () => {
  const footerStyle = {
    padding: '2rem',
    background: '#c8ed7d',
    color: '#1c2f19',
    fontSize: 14,
  };
  return (
    <div style={footerStyle}>
      Phonebook App &copy; 2021
    </div>
  );
};

export default Footer;
