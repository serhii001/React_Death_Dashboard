// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place

import history from 'utils/history';
import { take, call, put, fork, race, takeLatest } from 'redux-saga/effects';
import {
  getMontlyExpenses,
  updateMontlyExpenses,
  getCandidateIncome,
  updateCandidateIncome,
  getExpenseTypes,
  getIncomeTypes,
  updateCandidateMontlyExpenses,
  getCandidates,
  updateCandidate,
  getLeads
} from '../../utils/api/candidates';

import {
  GET_CANDIDATE_MONTHLY_EXPENSES_REQUEST,
  GET_CANDIDATE_MONTHLY_EXPENSES_SUCCESS,
  GET_CANDIDATE_MONTHLY_EXPENSES_FAILED,
  UPDATE_CANDIDATE_MONTHLY_EXPENSES_REQUEST,
  UPDATE_CANDIDATE_MONTHLY_EXPENSES_SUCCESS,
  UPDATE_CANDIDATE_MONTHLY_EXPENSES_FAILED,
  GET_CANDIDATE_INCOME_REQUEST,
  GET_CANDIDATE_INCOME_SUCCESS,
  GET_CANDIDATE_INCOME_FAILED,
  UPDATE_CANDIDATE_INCOME_REQUEST,
  UPDATE_CANDIDATE_INCOME_SUCCESS,
  UPDATE_CANDIDATE_INCOME_FAILED,
  GET_EXPENSE_TYPES_REQUEST,
  GET_EXPENSE_TYPES_SUCCESS,
  GET_EXPENSE_TYPES_FAILED,
  GET_INCOME_TYPES_REQUEST,
  GET_INCOME_TYPES_SUCCESS,
  GET_INCOME_TYPES_FAILED,
  GET_CANDIDATES_REQUEST,
  GET_CANDIDATES_SUCCESS,
  GET_CANDIDATES_FAILED,
  UPDATE_CANDIDATE_REQUEST,
  UPDATE_CANDIDATE_SUCCESS,
  UPDATE_CANDIDATE_FAILED,
  GET_LEADS_REQUEST,
  GET_LEADS_SUCCESS,
  GET_LEADS_FAILED
} from '../../constants/actionTypes';

/* eslint-disable no-use-before-define */
export default function* watchCandidatesListener() {
  yield takeLatest(GET_CANDIDATES_REQUEST, getCandidatesRequestSaga);
  yield takeLatest(UPDATE_CANDIDATE_REQUEST, updateCandidateRequestSaga);
  yield takeLatest(GET_LEADS_REQUEST, getLeadsRequestSaga);
  yield takeLatest(GET_CANDIDATE_MONTHLY_EXPENSES_REQUEST, getMonthlyExpensesRequestSaga);
  yield takeLatest(UPDATE_CANDIDATE_MONTHLY_EXPENSES_REQUEST, updateMonthlyExpensesRequestSaga);
  yield takeLatest(GET_CANDIDATE_INCOME_REQUEST, getIncomeRequestSaga);
  yield takeLatest(UPDATE_CANDIDATE_INCOME_REQUEST, updateIncomeExpensesRequestSaga);
  yield takeLatest(GET_EXPENSE_TYPES_REQUEST, getExpenseTypesRequestSaga);
  yield takeLatest(GET_INCOME_TYPES_REQUEST, getIncomeTypesRequestSaga);
  yield takeLatest(GET_INCOME_TYPES_REQUEST, getIncomeTypesRequestSaga);
}

export function* getCandidatesRequestSaga({ payload }) {
  try {
    const res = yield call(getCandidates, payload);
    yield put({ type: GET_CANDIDATES_SUCCESS, res });
  } catch (error) {
    yield put({ type: GET_CANDIDATES_FAILED, error });
  }
}
export function* updateCandidateRequestSaga({ payload }) {
  try {
    const res = yield call(updateCandidate, payload);
    yield put({ type: UPDATE_CANDIDATE_SUCCESS, res });
  } catch (error) {
    yield put({ type: UPDATE_CANDIDATE_FAILED, error });
  }
}

export function* getLeadsRequestSaga({ payload }) {
  try {
    const res = yield call(getLeads, payload);
    yield put({ type: GET_LEADS_SUCCESS, res });
  } catch (error) {
    yield put({ type: GET_LEADS_FAILED, error });
  }
}

export function* getMonthlyExpensesRequestSaga({ payload }) {
  try {
    const res = yield call(getMontlyExpenses, payload);
    yield put({ type: GET_CANDIDATE_MONTHLY_EXPENSES_SUCCESS, res });
  } catch (error) {
    yield put({ type: GET_CANDIDATE_MONTHLY_EXPENSES_FAILED, error });
  }
}

export function* updateMonthlyExpensesRequestSaga({ payload }) {
  try {
    const res = yield call(updateCandidateMontlyExpenses, payload);
    yield put({ type: UPDATE_CANDIDATE_MONTHLY_EXPENSES_SUCCESS, res });
  } catch (error) {
    yield put({ type: UPDATE_CANDIDATE_MONTHLY_EXPENSES_FAILED, error });
  }
}

export function* getIncomeRequestSaga({ payload }) {
  try {
    const res = yield call(getCandidateIncome, payload);
    yield put({ type: GET_CANDIDATE_INCOME_SUCCESS, res });
  } catch (error) {
    yield put({ type: GET_CANDIDATE_INCOME_FAILED, error });
  }
}

export function* updateIncomeExpensesRequestSaga({ payload }) {
  try {
    const res = yield call(updateCandidateIncome, payload);
    yield put({ type: UPDATE_CANDIDATE_INCOME_SUCCESS, res });
  } catch (error) {
    yield put({ type: UPDATE_CANDIDATE_INCOME_FAILED, error });
  }
}

export function* getExpenseTypesRequestSaga({ payload }) {
  try {
    const res = yield call(getExpenseTypes, payload);
    yield put({ type: GET_EXPENSE_TYPES_SUCCESS, res });
  } catch (error) {
    yield put({ type: GET_EXPENSE_TYPES_FAILED, error });
  }
}

export function* getIncomeTypesRequestSaga({ payload }) {
  try {
    const res = yield call(getIncomeTypes, payload);
    yield put({ type: GET_INCOME_TYPES_SUCCESS, res });
  } catch (error) {
    yield put({ type: GET_INCOME_TYPES_FAILED, error });
  }
}

// Little helper function to abstract going to different pages
function forwardTo(location) {
  history.push(location);
}
