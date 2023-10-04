import { parseQuery } from './querySearch';

describe('parseQuery', () => {
  test('replaces vcpu by vcpus', async () => {
    expect(parseQuery('vcpu > 2')).toBe('types[vcpus > 2]');
    expect(parseQuery('vcpu> 2')).toBe('types[vcpus> 2]');
    expect(parseQuery('vCPU > 2')).toBe('types[vcpus > 2]');
  });
});
