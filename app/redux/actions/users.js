import {
  SET_FILTERS,
  SET_SEARCH_QUERY
} from 'constants/actionTypes';

export const setFilter = payload => ({
  type: SET_FILTERS,
  payload
});
export const setSearch = payload => ({
  type: SET_SEARCH_QUERY,
  payload
});
