import axios from 'axios';
import { API_ENDPOINT_URL } from 'constants/defaults';

export const getImportStatus = payload => {
  const params = payload && payload.params;
  console.log('getUsers', params);
  return axios
    .get(`${API_ENDPOINT_URL}/campaigns/${payload.campaign_id}/import/${payload.import_id}`, { params })
    .then(res => {
      if (res.data) {
        return { success: true, data: res.data };
      }
      return { success: false, reason: res.message };
    })
    .catch(err => ({ success: false, reason: err.response.data.message }));
};

