import { AWS_PROVIDER, AZURE_PROVIDER, GCP_PROVIDER } from '../../constants';

export const SSHUsername = (provider) => {
  switch (provider) {
    case AWS_PROVIDER:
      return 'ec2-user';
    case AZURE_PROVIDER:
      return 'azureuser';
    case GCP_PROVIDER:
      return 'gcp-user';
    default:
      '';
  }
};

const flattenInstances = (instances) => {
  return instances.map(({ instance_id, detail }) => ({ id: instance_id, ...detail }));
};
const convertToCSV = (objArray) => {
  const flatten = flattenInstances(objArray);
  const header = Object.keys(flatten[0]);
  const csv = flatten.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName])).join(','));
  csv.unshift(header.join(','));
  return csv.join('\r\n');
};

export const exportToCSV = (data) => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'instances.csv';
  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
