import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  // const filterText = useSelector(({ filter }) => filter);
  // const dispatch = useDispatch();

  const { filterText, setFilter } = props; // eslint-disable-line no-shadow

  const handleChange = (event) => {
    const filterTerm = event.target.value.trim();
    setFilter(filterTerm);
  };

  const clearFilter = () => {
    if (filterText !== '') {
      setFilter('');
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

Filter.propTypes = {
  filterText: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filterText: state.filter,
});

// A group of action creator functions, passed to the connected component as props.
const mapDispatchToProps = {
  setFilter,
};

const connectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default connectedFilter;
