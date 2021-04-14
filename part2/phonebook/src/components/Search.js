import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchTerm, searchHandler }) => (
  <div>
    Search:
    <br />
    <input value={searchTerm} onChange={searchHandler} />
  </div>
);

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
};

export default Search;
