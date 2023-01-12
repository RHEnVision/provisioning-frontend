export const PF_SUCCESS_100 = '#3E8635';
export const PF_DANGER_100 = '#C9190B';

export const AWS_STEPS = [
  { description: 'Uploading SSH public key', progress: 0 },
  { description: 'Creating AWS reservation', progress: 20 },
  {
    description: 'Waiting for AWS',
    progress: 40,
  },
  { description: 'Launch is completed', progress: 100 },
];
export const POLLING_BACKOFF_INTERVAL = [
  500, 600, 700, 800, 900, 1000, 1200, 1400, 1600, 1800, 2000, 3000, 4000, 5000, 10000, 15000, 20000, 25000, 30000,
];
