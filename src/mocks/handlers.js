import { http, HttpResponse } from 'msw';
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
  http.get(provisioningUrl('sources'), ({ request }) => {
    const url = new URL(request.url);
    const provider = url.searchParams.get('provider');
    if (provider === 'aws') {
      return HttpResponse.json(sourcesList);
    } else if (provider === 'gcp') {
      return HttpResponse.json(gcpSourcesList);
    }
  }),
  http.get(provisioningUrl('sources/:sourceID/upload_info'), ({ params }) => {
    const { sourceID } = params;
    if (sourceID === '1' || sourceID === '2') {
      return HttpResponse.json(awsSourceUploadInfo());
    } else if (sourceID === '10') {
      return HttpResponse.json(gcpSourceUploadInfo());
    } else if (sourceID === '66') {
      return HttpResponse.json(azureSourceUploadInfo);
    }
  }),
  http.get(provisioningUrl('pubkeys'), () => {
    return HttpResponse.json(pubkeysList);
  }),
  http.get(provisioningUrl('instance_types/aws'), () => {
    return HttpResponse.json(awsInstanceTypeList);
  }),
  http.get(provisioningUrl('instance_types/azure'), () => {
    return HttpResponse.json(azureInstanceTypeList);
  }),
  http.get(imageBuilderURL(`composes/${parentImage.id}/clones`), () => {
    return HttpResponse.json(clonedImages);
  }),
  http.get(imageBuilderURL(`clones/:id`), () => {
    return HttpResponse.json(successfulCloneStatus);
  }),
  http.post(provisioningUrl('pubkeys'), () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.post(provisioningUrl('reservations/azure'), () => {
    return HttpResponse.json(createdAzureReservation);
  }),
  http.post(provisioningUrl('reservations/gcp'), () => {
    return HttpResponse.json(createdGCPReservation);
  }),
  http.post(provisioningUrl('reservations/aws'), () => {
    return HttpResponse.json(createdAWSReservation);
  }),
  http.get(provisioningUrl('reservations/:id'), () => {
    return HttpResponse.json(reservation);
  }),
  http.get(provisioningUrl('reservations/aws/:id'), () => {
    return HttpResponse.json(AWSReservation);
  }),
  http.get(provisioningUrl('reservations/azure/:id'), () => {
    return HttpResponse.json(getAzureReservation);
  }),
  http.get(provisioningUrl('reservations/gcp/:id'), () => {
    return HttpResponse.json(GCPReservation);
  }),
  http.get(provisioningUrl('sources/:id/launch_templates'), () => {
    return HttpResponse.json(templates);
  }),
];
