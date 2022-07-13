import '@testing-library/jest-dom/extend-expect';
import { server } from '../src/mocks/server';

// this globally mocks the initial global state, for editing go to WizardContext/__mocks__
jest.mock('../src/Components/Common/WizardContext/initialState');

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
