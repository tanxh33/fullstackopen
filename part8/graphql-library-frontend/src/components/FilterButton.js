import React from 'react';

const FilterButton = ({ label, disabled, onClick }) => (
  <button disabled={disabled} onClick={onClick} type="button">
    {label}
  </button>
);

export default FilterButton;
