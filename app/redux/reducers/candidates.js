import { filter } from 'lodash';
import {
  GET_CANDIDATE_MONTHLY_EXPENSES_SUCCESS,
  GET_CANDIDATE_MONTHLY_EXPENSES_FAILED,
  UPDATE_CANDIDATE_MONTHLY_EXPENSES_SUCCESS,
  UPDATE_CANDIDATE_MONTHLY_EXPENSES_FAILED,
  GET_CANDIDATE_INCOME_SUCCESS,
  GET_CANDIDATE_INCOME_FAILED,
  UPDATE_CANDIDATE_INCOME_SUCCESS,
  UPDATE_CANDIDATE_INCOME_FAILED,
  GET_EXPENSE_TYPES_SUCCESS,
  GET_EXPENSE_TYPES_FAILED,
  GET_INCOME_TYPES_SUCCESS,
  GET_INCOME_TYPES_FAILED,
  GET_CANDIDATES_SUCCESS,
  GET_CANDIDATES_FAILED,
  GET_LEADS_SUCCESS,
  GET_LEADS_FAILED
} from 'constants/actionTypes';

export const candidatesInitialState = {
  candidates: {
    data: [],
    count: 0
  },
  leads: {
    data: [],
    count: 0
  },
  expenseTypes: [],
  incomeTypes: [],
  expenses: [],
  income: [],
};
let temp;
export function candidatesReducer(state = candidatesInitialState, action) {
  switch (action.type) {
    case GET_CANDIDATES_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          candidates: {
            data: [],
            count: 0
          }
        };
      }
      return {
        ...state,
        candidates: {
          data: action.res && action.res.data && action.res.data.data,
          count: action.res && action.res.count
        }
      };
    case GET_CANDIDATES_FAILED:
      return {
        ...state,
        candidates: {
          data: [],
          count: 0
        }
      };
    case GET_LEADS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          leads: {
            data: [],
            count: 0
          }
        };
      }
      return {
        ...state,
        leads: {
          data: action.res && action.res.data && action.res.data.data,
          count: action.res && action.res.count
        }
      };
    case GET_LEADS_FAILED:
      return {
        ...state,
        leads: {
          data: [],
          count: 0
        }
      };
    case GET_CANDIDATE_MONTHLY_EXPENSES_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          expenses: []
        };
      }
      return {
        ...state,
        expenses: action.res && action.res.data
      };
    case GET_CANDIDATE_MONTHLY_EXPENSES_FAILED:
      return {
        ...state,
        expenses: []
      };
    case UPDATE_CANDIDATE_MONTHLY_EXPENSES_SUCCESS:
      return { ...state };
    case UPDATE_CANDIDATE_MONTHLY_EXPENSES_FAILED:
      return { ...state, expenses: [] };
    case GET_CANDIDATE_INCOME_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          income: []
        };
      }
      return {
        ...state,
        income: action.res && action.res.data
      };
    case GET_CANDIDATE_INCOME_FAILED:
      return { ...state, income: [] };
    case UPDATE_CANDIDATE_INCOME_SUCCESS:
      return { ...state };
    case UPDATE_CANDIDATE_INCOME_FAILED:
      return { ...state, income: [] };
    case GET_EXPENSE_TYPES_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          expenseTypes: []
        };
      }
      return {
        ...state,
        expenseTypes: action.res && action.res.data && action.res.data.data
      };
    case GET_EXPENSE_TYPES_FAILED:
      return { ...state, expenseTypes: [] };
    case GET_INCOME_TYPES_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          incomeTypes: []
        };
      }
      return {
        ...state,
        incomeTypes: action.res && action.res.data && action.res.data.data
      };
    case GET_INCOME_TYPES_FAILED:
      return { ...state, incomeTypes: [] };
    default:
      return state;
  }
}
