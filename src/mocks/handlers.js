import { rest } from 'msw';
import { provisioningUrl } from '../API/helpers';
import { instanceTypeList } from './fixtures/instanceTypes.fixtures';
import { sourcesList } from './fixtures/sources.fixtures';

export const handlers = [
  rest.get(provisioningUrl('sources'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sourcesList));
  }),
  rest.get(
    provisioningUrl('sources/:sourceID/instance_types'),
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(instanceTypeList));
    }
  ),
];
