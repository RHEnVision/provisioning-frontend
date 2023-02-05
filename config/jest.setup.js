import '@testing-library/jest-dom/extend-expect';
import { server } from '../src/mocks/server';
import { QueryCache } from 'react-query';

const queryCache = new QueryCache();

// this globally mocks the initial global state, for editing go to WizardContext/__mocks__
jest.mock('../src/Components/Common/WizardContext/initialState');

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});

afterAll(() => server.close());
