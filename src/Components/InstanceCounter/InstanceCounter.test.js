import React from 'react';
import InstanceCounter from '.';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../mocks/utils';
import { MAX_INSTANCES, MIN_INSTANCES } from './constants';

describe('InstanceCounter', () => {
  test('Try over max value', async () => {
    const maxedOutInput = await mountAndChangeInput((MAX_INSTANCES + 1).toString());
    expect(maxedOutInput).toHaveValue(MAX_INSTANCES);
  });

  test('Try to use a string instead of a number', async () => {
    const minOutInput = await mountAndChangeInput('some-string');
    expect(minOutInput).toHaveValue(MIN_INSTANCES);
  });

  test('float number', async () => {
    const FLOAT_NUMBER = '2.5';
    const maxedOutInput = await mountAndChangeInput(FLOAT_NUMBER);
    expect(maxedOutInput).toHaveValue(Math.floor(FLOAT_NUMBER));
  });
});

const mountAndChangeInput = async (value) => {
  render(<InstanceCounter setValidation={jest.fn} />);
  const counter = await screen.findByLabelText('number of instances');
  await userEvent.type(counter, value);
  return counter;
};
