export const sourcesList = [
  {
    name: 'Source 1',
    id: '1',
  },
  { name: 'Source 2', id: '2' },
];

export const gcpSourcesList = [
  {
    name: 'GCP Source 1',
    id: '10',
  },
];

export const gcpSourceUploadInfo = (service_account_principal = 'serviceAccount:example@redhat.com') => ({ gcp: { service_account_principal } });

export const awsSourceUploadInfo = (account_id = '123456789') => ({ aws: { account_id } });

export const awsSourceFailedUploadInfo = () => ({
  msg: 'AWS API error: unable to get AWS upload info',
  trace_id: 'trcid',
  error:
    'unable to initialize AWS client: cannot assume role operation error STS: AssumeRole, https response error StatusCode: 400, RequestID: <AWSRID>, api error ValidationError: arn:aws:iam:asdfasdf/doesntwork is invalid',
  version: '32b1201',
  build_time: '2023-04-26_11:14:00',
});
