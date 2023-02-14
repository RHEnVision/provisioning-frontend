export const instanceTypeList = [
  {
    id: 1,
    name: 'm5dn.12xlarge',
    vcpus: 48,
    cores: 24,
    memory: 196608,
    supported: true,
    architecture: 'x86_64',
  },
  {
    id: 2,
    name: 't4g.nano',
    vcpus: 2,
    cores: 2,
    memory: 512,
    architecture: 'arm64',
  },
  {
    id: 3,
    name: 't1.micro',
    vcpus: 1,
    cores: 2,
    memory: 128,
    supported: true,
    architecture: 'x86_64',
  },
  {
    id: 4,
    name: 't1.nano',
    vcpus: 1,
    cores: 1,
    memory: 512,
    architecture: 'x86_64',
    supported: false,
  },
];
