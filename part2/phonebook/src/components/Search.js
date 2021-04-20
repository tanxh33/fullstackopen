import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchTerm, searchHandler }) => (
  <div className="mb-s">
    <div className="mb-xs">Search:</div>
    <input value={searchTerm} onChange={searchHandler} />
  </div>
);

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
};

export default Search;
