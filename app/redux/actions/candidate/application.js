import { GET_EMPLOYMENTS } from 'constants/actionTypes';
import { applicationApis } from '../../../utils/api/candidate/application';

export const AsyncFunc = (...args) => Promise;
export const dispatch = action => {};
export const applicationActions = {
  PostWorkAndFinances,
  GetWorkAndFinances
};
function PostWorkAndFinances(candidate_id, requestModel) {
  return applicationApis.PostWorkAndFinances(candidate_id, requestModel).then(res => {
    console.log(res);
  });
}

export const GetWorkAndFinances = candidate_id => async dispatch => {
  try {
    const res = await applicationApis.GetWorkAndFinances(candidate_id);
    const payload = {
      employments: res.data
    };
    dispatch({
      type: GET_EMPLOYMENTS,
      payload
    });
    return payload;
  } catch (error) {
    return null;
  }
};
