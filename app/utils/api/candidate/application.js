import axios from 'axios';
import { map } from 'lodash';
import { API_ENDPOINT_URL } from 'constants/defaults';

export const applicationApis = {
  PostWorkAndFinances,
  GetWorkAndFinances,
  GetAddress,
  PostAddress,
  PostPhoneNumbers,
  GetPhoneNumbers
};
function PostWorkAndFinances(candidate_id, requestModel) {
  const payload = map(requestModel, item => ({
    employer_name: item.employer_name,
    start_date: item.start_date,
    end_date: item.end_date,
    gross_salary: item.gross_salary,
    gross_salary_frequency: item.gross_salary_frequency,
    other_income: item.other_income,
    other_income_frequency: item.other_income_frequency,
    current: item.current
  }));
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_ENDPOINT_URL}/candidates/${candidate_id}/employments`, payload)
      .then(response => resolve(response))
      .catch(e => {
        reject(e);
      });
  });
}
function GetWorkAndFinances(candidate_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_ENDPOINT_URL}/candidates/${candidate_id}/employments`)
      .then(response => resolve(response))
      .catch(e => {
        reject(e);
      });
  });
}
function GetAddress(candidate_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_ENDPOINT_URL}/candidates/${candidate_id}/addresses`)
      .then(response => resolve(response))
      .catch(e => {
        reject(e);
      });
  });
}
function PostAddress(candidate_id, requestModel) {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_ENDPOINT_URL}/candidates/${candidate_id}/addresses`, requestModel)
      .then(response => resolve(response))
      .catch(e => {
        reject(e);
      });
  });
}
function PostPhoneNumbers(candidate_id, requestModel) {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_ENDPOINT_URL}/candidates/${candidate_id}/contact_numbers`, requestModel)
      .then(response => resolve(response))
      .catch(e => {
        reject(e);
      });
  });
}
function GetPhoneNumbers(candidate_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_ENDPOINT_URL}/candidates/${candidate_id}/contact_numbers`)
      .then(response => resolve(response))
      .catch(e => {
        reject(e);
      });
  });
}
