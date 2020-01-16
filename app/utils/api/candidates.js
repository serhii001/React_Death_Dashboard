import axios from 'axios';
// import queryString from 'query-string';
import { API_ENDPOINT_URL } from '../../constants/defaults';


export const getCandidates = payload => {
  const query = payload && payload.query;
  console.log('getCandidates', query);
  return axios
    .get(`${API_ENDPOINT_URL}/candidates/${query ? `?${query}` : ''}`)
    .then(res => {
      console.log('getCandidates res', res);
      if (res.data) {
        return { success: true, data: res.data };
      }
      return { success: false, reason: res.message };
    })
    .catch(err => ({ success: false, reason: err.response.data.message }));
};

export const updateCandidate = payload => {
  const data = {
    'public_id': payload.public_id,
    'first_name': payload.first_name,
    'last_name': payload.last_name,
    'middle_initial': payload.middle_initial,
    'suffix': payload.suffix,
    'address': payload.address,
    'city': payload.city,
    'state': payload.state,
    'zip': payload.zip,
    // 'estimated_debt': payload.estimated_debt,
    // 'inserted_on': payload.inserted_on,
    'county': payload.county,
    'email': payload.email,
    'language': payload.language,
    'phone': payload.phone,
    'status': payload.status,
    // 'disposition': payload.disposition,
    // 'credit_report_account': payload.credit_report_account
  };
  console.log('updateCandidate', payload, data)
  return axios
    .put(`${API_ENDPOINT_URL}/candidates/${payload.public_id}`, data)
    .then(res => {
      if (res.data) {
        return Promise.resolve({ success: true, reason: res.data });
      }
      return Promise.resolve({ success: false, reason: res });
    })
    .catch(err => {
      return Promise.reject({ success: false, error: err.response });
    });
};

export const getLeads = payload => {
  const query = payload && payload.query;
  console.log('getLeads', query);
  return axios
    .get(`${API_ENDPOINT_URL}/leads/${query ? `?${query}` : ''}`)
    .then(res => {
      console.log('getLeads res', res);
      if (res.data) {
        return { success: true, data: res.data };
      }
      return { success: false, reason: res.message };
    })
    .catch(err => ({ success: false, reason: err.response.data.message }));
};

export const getMontlyExpenses = payload => {
  return axios
    .get(`${API_ENDPOINT_URL}/candidates/${payload.id}/monthly-expenses`)
    .then(res => {
      if (res.data) {
        return Promise.resolve({ success: true, data: res.data });
      }
      return Promise.resolve({ success: false, reason: res.data.message });
    })
    .catch(err => {
      return Promise.reject({ success: false, error: err.response.data });
    });
};

export const updateCandidateMontlyExpenses = payload => {
  console.log('updateCandidateMontlyExpenses', payload)
  return axios
    .put(`${API_ENDPOINT_URL}/candidates/${payload.id}/monthly-expenses`, payload.data)
    .then(res => {
      if (res.data) {
        return Promise.resolve({ success: true, reason: res.data });
      }
      return Promise.resolve({ success: false, reason: res });
    })
    .catch(err => {
      return Promise.reject({ success: false, error: err.response });
    });
};

export const getCandidateIncome = payload => {
  return axios
    .get(`${API_ENDPOINT_URL}/candidates/${payload.id}/income-sources`)
    .then(res => {
      console.log('getCandidateIncome', res);
      if (res.data) {
        return Promise.resolve({ success: true, data: res.data });
      }
      return Promise.resolve({ success: false, reason: 'Empty data' });
    })
    .catch(err => {
      return Promise.reject({ success: false, error: err.response.data });
    });
};

export const updateCandidateIncome = payload => {
  console.log('updateCandidateIncome', payload);
  return axios
    .put(`${API_ENDPOINT_URL}/candidates/${payload.id}/income-sources`, payload.data)
    .then(res => {
      if (res.data) {
        return Promise.resolve({ success: true, reason: res.data });
      }
      return Promise.resolve({ success: false, reason: res });
    })
    .catch(err => {
      return Promise.reject({ success: false, error: err.response });
    });
};

export const getExpenseTypes = payload => {
  return axios
    .get(`${API_ENDPOINT_URL}/candidates/expense-types`)
    .then(res => {
      console.log('getExpenseTypes', res);
      if (res.data) {
        return { success: true, data: res.data };
      }
      return { success: false, reason: res.message };
    })
    .catch(err => ({ success: false, reason: err.response.data.message }));
};

export const getIncomeTypes = payload => {
  return axios
    .get(`${API_ENDPOINT_URL}/candidates/income-types`)
    .then(res => {
      console.log('getIncomeTypes', res);
      if (res.data) {
        return { success: true, data: res.data };
      }
      return { success: false, reason: res.message };
    })
    .catch(err => ({ success: false, reason: err.response.data.message }));
};

export const getImports = payload => {
  const params = payload && payload.params;
  console.log('getUsers', params);
  return axios
    .get(`${API_ENDPOINT_URL}/candidates/imports`, { params })
    .then(res => {
      if (res.data) {
        return { success: true, data: res.data };
      }
      return { success: false, reason: res.message };
    })
    .catch(err => ({ success: false, reason: err.response.data.message }));
};

