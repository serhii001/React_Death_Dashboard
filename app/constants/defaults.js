/* eslint-disable */
export const API_ENDPOINT_URL = process.env.API_ENDPOINT;

export const filters = {
  leftColumn: [
    { key: 'campaign_name', text: 'Campaign Name', field: false, value: false },
    { key: 'first_name', text: 'First Name', field: 'first_name', value: true },
    { key: 'last_name', text: 'Last Name', field: 'last_name', value: true },
    { key: 'status', text: 'Status', field: 'status', value: false },
    { key: 'opener', text: 'Opener', field: false, value: false },
    { key: 'phone_number', text: 'Phone Number', field: 'phone', value: false },
    { key: 'inbound', text: 'Inbound', field: false, value: false },
    { key: 'outbound', text: 'Outbond', field: false, value: false },
  ],
  rightColumn: [
    { key: 'client_id', text: 'Client ID', field: 'public_id', tableName: '', order: 0, value: false },
    { key: 'last_call', text: 'Last Call', field: false, value: false },
    { key: 'total_calls', text: 'Total Calls', field: false, value: true },
    { key: 'call_duration', text: 'Call Duration', field: false, value: false },
    { key: 'date_created', text: 'Date Created', field: 'inserted_on', value: true },
    { key: 'last_contact', text: 'Last Contact', field: false, value: true },
  ],
};
export const candidateFields = [
  {field: 'first_name', tableName: 'F Name', order: 5},
  {field: 'last_name', tableName: 'L Name', order: 10},
  {field: 'status', tableName: 'Status', order: 15},
  {field: 'inserted_on', tableName: 'Date Created', order: 20},
  {field: 'phone', tableName: 'Phone', order: 25},
  {field: 'last_contact', tableName: 'Last Contact', order: 30},
  {field: 'total_calls', tableName: 'Calls', order: 35},
  {field: 'last_call', tableName: 'Last Call', order: 40},
];


export const chatFilters = {
  leftColumn: [
    { key: 'sms', text: 'SMS', value: false },
    { key: 'actions', text: 'Actions', value: false },
  ],
  rightColumn: [
    { key: 'notes', text: 'Notes', value: false },
    { key: 'calls', text: 'Calls', value: false },
  ],
};

export const FREQUENCY_TYPES = {
  annual: 'ANNUAL',
  monthly: 'MONTHLY',
}
