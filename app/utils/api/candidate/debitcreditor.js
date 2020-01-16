import axios from 'axios';
import { API_ENDPOINT_URL } from 'constants/defaults';

export const debitCreditorApis = {
  GetCreditReportData
};

function GetCreditReportData(lead_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_ENDPOINT_URL}/leads/${lead_id}/credit-report/debts`)
      .then(response => resolve(response.data))
      .catch(e => {
        reject(e);
      });
  });
}
