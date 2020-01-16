import { GET_EMPLOYMENTS } from 'constants/actionTypes';

export const applicationInitialState = {
  employments: []
};
export function applicationReducer(state = applicationInitialState, action) {
  console.log('payload', action.results);
  switch (action.type) {
    case GET_EMPLOYMENTS:
      console.log('get_employments', action.payload.employments);
      return { ...state, employments: action.payload.employments };
    default:
      return state;
  }
}
