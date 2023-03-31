export const awsInstanceTypeList = [
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

export const azureInstanceTypeList = [
  {
    name: 'Standard_A1_v2',
    vcpus: 1,
    cores: 1,
    memory_mib: 2000,
    storage_gb: 10,
    supported: true,
    architecture: 'x86_64',
    azure: {
      gen_v1: true,
      gen_v2: false,
    },
  },
  {
    name: 'Standard_A2_v2',
    vcpus: 2,
    cores: 2,
    memory_mib: 4000,
    storage_gb: 20,
    supported: true,
    architecture: 'x86_64',
    azure: {
      gen_v1: true,
      gen_v2: false,
    },
  },
  {
    name: 'Standard_A2m_v2',
    vcpus: 2,
    cores: 2,
    memory_mib: 16000,
    storage_gb: 20,
    supported: true,
    architecture: 'x86_64',
    azure: {
      gen_v1: true,
      gen_v2: false,
    },
  },
  {
    name: 'Standard_B1ls',
    vcpus: 1,
    cores: 1,
    memory_mib: 500,
    storage_gb: 4,
    supported: false,
    architecture: 'x86_64',
    azure: {
      gen_v1: true,
      gen_v2: true,
    },
  },
  {
    name: 'Standard_D16ps_v5',
    vcpus: 16,
    cores: 16,
    memory_mib: 64000,
    storage_gb: 0,
    supported: true,
    architecture: 'arm64',
    azure: {
      gen_v1: false,
      gen_v2: true,
    },
  },
];

export const AWSPopularType = {
  id: 3,
  name: 't2.small',
  vcpus: 1,
  cores: 2,
  memory: 128,
  supported: true,
  architecture: 'x86_64',
};
export const AWSTypesWithPopularType = [...awsInstanceTypeList, AWSPopularType];
