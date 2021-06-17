const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export const setFilter = (filterTerm) => ({
  type: 'SET_FILTER',
  filter: filterTerm,
});

export default filterReducer;
