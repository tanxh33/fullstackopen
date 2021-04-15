import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, clickHandler }) => (
  <button type="submit" onClick={clickHandler}>{text}</button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default Button;
