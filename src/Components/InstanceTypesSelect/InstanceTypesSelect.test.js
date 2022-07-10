import React from 'react';
import InstanceTypesSelect from '.';
import { instanceTypeList } from '../../mocks/fixtures/instanceTypes.fixtures';
import { waitFor, render, fireEvent, screen } from '../../mocks/utils';

describe('InstanceTypesSelect', () => {
  test('populate instance types select', async () => {
    mountSelectAndClick();
    const items = await screen.findAllByLabelText('Instance Type item');
    expect(items).toHaveLength(instanceTypeList.length);
  });
});

const mountSelectAndClick = () => {
  render(<InstanceTypesSelect />);
  waitFor(() => fireEvent.click(screen.getByText(/Select instance type/)));
};
