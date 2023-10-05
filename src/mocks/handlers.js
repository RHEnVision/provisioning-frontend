import { rest } from 'msw';
import { imageBuilderURL, provisioningUrl } from '../API/helpers';
import { awsInstanceTypeList, azureInstanceTypeList } from './fixtures/instanceTypes.fixtures';
import { sourcesList, gcpSourcesList, awsSourceUploadInfo, azureSourceUploadInfo, gcpSourceUploadInfo } from './fixtures/sources.fixtures';
import { pubkeysList } from './fixtures/pubkeys.fixtures';
import { clonedImages, parentImage, successfulCloneStatus } from './fixtures/image.fixtures';
import {
  AWSReservation,
  getAzureReservation,
  createdAWSReservation,
  createdAzureReservation,
  reservation,
  createdGCPReservation,
  GCPReservation,
} from './fixtures/reservation.fixtures';
import { templates } from './fixtures/templates.fixtures';

export const handlers = [
  rest.get(provisioningUrl('sources'), (req, res, ctx) => {
    const provider = req.url.searchParams.get('provider');
    if (provider === 'aws') {
      return res(ctx.status(200), ctx.json(sourcesList));
    } else if (provider === 'gcp') {
      return res(ctx.status(200), ctx.json(gcpSourcesList));
    }
  }),
  rest.get(provisioningUrl('sources/:sourceID/upload_info'), (req, res, ctx) => {
    const { sourceID } = req.params;
    if (sourceID === '1' || sourceID === '2') {
      return res(ctx.status(200), ctx.json(awsSourceUploadInfo()));
    } else if (sourceID === '10') {
      return res(ctx.status(200), ctx.json(gcpSourceUploadInfo()));
    } else if (sourceID === '66') {
      return res(ctx.status(200), ctx.json(azureSourceUploadInfo));
    }
  }),
  rest.get(provisioningUrl('pubkeys'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(pubkeysList));
  }),
  rest.get(provisioningUrl('instance_types/aws'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(awsInstanceTypeList));
  }),
  rest.get(provisioningUrl('instance_types/azure'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(azureInstanceTypeList));
  }),
  rest.get(imageBuilderURL(`composes/${parentImage.id}/clones`), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(clonedImages));
  }),
  rest.get(imageBuilderURL(`clones/:id`), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successfulCloneStatus));
  }),
  rest.post(provisioningUrl('pubkeys'), (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(provisioningUrl('reservations/azure'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(createdAzureReservation));
  }),
  rest.post(provisioningUrl('reservations/gcp'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(createdGCPReservation));
  }),
  rest.post(provisioningUrl('reservations/aws'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(createdAWSReservation));
  }),
  rest.get(provisioningUrl('reservations/:id'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(reservation));
  }),
  rest.get(provisioningUrl('reservations/aws/:id'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(AWSReservation));
  }),
  rest.get(provisioningUrl('reservations/azure/:id'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getAzureReservation));
  }),
  rest.get(provisioningUrl('reservations/gcp/:id'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(GCPReservation));
  }),
  rest.get(provisioningUrl('sources/:id/launch_templates'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(templates));
  }),
];
