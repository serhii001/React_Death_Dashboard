import {
  GET_CANDIDATE_MONTHLY_EXPENSES_REQUEST,
  UPDATE_CANDIDATE_MONTHLY_EXPENSES_REQUEST,
  GET_CANDIDATE_INCOME_REQUEST,
  UPDATE_CANDIDATE_INCOME_REQUEST,
  GET_INCOME_TYPES_REQUEST,
  GET_EXPENSE_TYPES_REQUEST,
  GET_CANDIDATES_REQUEST,
  UPDATE_CANDIDATE_REQUEST,
  GET_LEADS_REQUEST
} from 'constants/actionTypes';

export const getCandidateMonthlyExpenses = payload => ({
  type: GET_CANDIDATE_MONTHLY_EXPENSES_REQUEST,
  payload
});
export const updateCandidateMonthlyExpenses = payload => ({
  type: UPDATE_CANDIDATE_MONTHLY_EXPENSES_REQUEST,
  payload
});
export const getCandidateIncome = payload => ({
  type: GET_CANDIDATE_INCOME_REQUEST,
  payload
});
export const updateCandidateIncome = payload => ({
  type: UPDATE_CANDIDATE_INCOME_REQUEST,
  payload
});
export const getIncomeTypes = payload => ({
  type: GET_INCOME_TYPES_REQUEST,
  payload
});
export const geteExpenseTypes = payload => ({
  type: GET_EXPENSE_TYPES_REQUEST,
  payload
});
export const getCandidates = payload => ({
  type: GET_CANDIDATES_REQUEST,
  payload
});
export const updateCandidate = payload => ({
  type: UPDATE_CANDIDATE_REQUEST,
  payload
});
export const getLeads = payload => ({
  type: GET_LEADS_REQUEST,
  payload
});
