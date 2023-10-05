export const sourcesList = {
  data: [
    {
      name: 'Source 1',
      id: '1',
    },
    { name: 'Source 2', id: '2' },
  ],
};

export const gcpSourcesList = {
  data: [
    {
      name: 'GCP Source 1',
      id: '10',
    },
  ],
};

export const azureSourcesList = {
  data: [
    {
      name: 'Azure Source 1',
      id: '66',
    },
  ],
};

export const gcpSourceUploadInfo = () => ({ gcp: {} });

export const awsSourceUploadInfo = (account_id = '123456789') => ({ aws: { account_id } });

export const azureSourceUploadInfo = {
  azure: {
    resource_groups: ['testGroup', 'Cool Group'],
    subscription_id: '617807e1-e4e0-4855-983c-1e3ce1e49674',
    tenant_id: '617807e1-e4e0-481c-983c-be3ce1e49253',
  },
  provider: 'azure',
};

export const awsSourceFailedUploadInfo = () => ({
  msg: 'AWS API error: unable to get AWS upload info',
  trace_id: 'trcid',
  error:
    'unable to initialize AWS client: cannot assume role operation error STS: AssumeRole, https response error StatusCode: 400, RequestID: <AWSRID>, api error ValidationError: arn:aws:iam:asdfasdf/doesntwork is invalid',
  version: '32b1201',
  build_time: '2023-04-26_11:14:00',
});
