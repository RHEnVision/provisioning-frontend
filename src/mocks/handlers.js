import { rest } from 'msw';
import { imageBuilderURL, provisioningUrl } from '../API/helpers';
import { instanceTypeList } from './fixtures/instanceTypes.fixtures';
import { sourcesList } from './fixtures/sources.fixtures';
import { pubkeysList } from './fixtures/pubkeys.fixtures';
import { clonedImages, parentImage } from './fixtures/image.fixtures';

export const handlers = [
  rest.get(provisioningUrl('sources'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sourcesList));
  }),
  rest.get(provisioningUrl('pubkeys'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(pubkeysList));
  }),
  rest.get(provisioningUrl('instance_types/aws'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(instanceTypeList));
  }),
  rest.get(imageBuilderURL(`composes/${parentImage.id}/clones`), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(clonedImages));
  }),
];
