import React from 'react';

const FilterButton = ({ content, disabled, onClick }) => (
  <button disabled={disabled} onClick={onClick} type="button">
    {content}
  </button>
);

export default FilterButton;
