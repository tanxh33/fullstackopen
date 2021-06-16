import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const filterText = useSelector(({ filter }) => filter);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filterTerm = event.target.value.trim();
    dispatch(setFilter(filterTerm));
  };

  const clearFilter = () => {
    if (filterText !== '') {
      dispatch(setFilter(''));
    }
  };

  const style = {
    marginBottom: '0.5rem',
  };

  return (
    <div style={style}>
      {'Filter: '}
      <input id="filter" onChange={handleChange} value={filterText} />
      <button onClick={clearFilter} type="button">{' X '}</button>
    </div>
  );
};

export default Filter;
