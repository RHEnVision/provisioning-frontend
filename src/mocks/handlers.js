import { rest } from 'msw';
import { provisioningUrl } from '../API/helpers';
import { sourcesList } from './fixtures/sources.fixtures';

export const handlers = [
  rest.get(provisioningUrl('sources'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sourcesList));
  }),
];
