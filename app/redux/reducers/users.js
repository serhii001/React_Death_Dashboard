import { filter } from 'lodash';
import { SET_FILTERS, SET_SEARCH_QUERY } from 'constants/actionTypes';

export const userInitialState = {
  permissions: {
    data: [],
    total: 0
  },
  roles: {
    data: [],
    total: 0
  },
  users: {
    data: [],
    total: 0
  },
  filter: {},
  searchQuery: '',
  role: {}
};
let temp;
export function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case SET_FILTERS:
      return { ...state, filter: action.payload };
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
}
