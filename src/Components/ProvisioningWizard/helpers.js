import PropTypes from 'prop-types';
import { useQuery, useQueries } from 'react-query';

import { sourcesQueryKey, sourceUploadInfoKey } from '../../API/queryKeys';
import { fetchSourcesList, fetchSourceUploadInfo } from '../../API';
import { AWS_PROVIDER, AZURE_PROVIDER } from '../../constants';

export const imageProps = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string,
  provider: PropTypes.string,
  architecture: PropTypes.string,
  sourceIDs: PropTypes.arrayOf(PropTypes.string),
  accountIDs: PropTypes.arrayOf(PropTypes.string),
}).isRequired;

export const sourcesData = (image, { refetch = false } = {}) => {
  const {
    error,
    isLoading,
    data: sources,
  } = useQuery(sourcesQueryKey(image.provider), () => fetchSourcesList(image.provider), {
    enabled: !!image.provider,
    refetchInterval: refetch && 10000,
  });
  return { error, isLoading, sources };
};

const loadSourcesUploadInfos = (image, { refetch }) => {
  const { sources, isLoading: isLoadingSources, error: sourcesError } = sourcesData(image, { refetch });

  const uploadInfos = useQueries(
    sources?.map((source) => ({ queryKey: sourceUploadInfoKey(source.id), queryFn: () => fetchSourceUploadInfo(source.id), retry: 1 })) || []
  );

  const isLoading = isLoadingSources || uploadInfos.every((info) => info.isLoading);
  const infos = [];
  sources?.forEach((source, i) => {
    uploadInfos[i].isSuccess && infos.push({ ...uploadInfos[i].data, source_id: source.id });
  });

  return { isLoading, error: sourcesError, infos };
};

const providerSourceFilter = (image) => {
  switch (image.provider) {
    case AWS_PROVIDER:
      return (info) => image.sourceIDs?.includes(info.source_id) || image.accountIDs?.includes(info.aws.account_id);
    case AZURE_PROVIDER:
      return (info) => image.sourceIDs?.includes(info.source_id) || info.azure?.subscription_id === image.uploadOptions?.subscription_id;
    default:
      return (info) => image.sourceIDs?.includes(info.source_id);
  }
};

export const sourcesForImage = (image, { refetch = false } = {}) => {
  const { isLoading, error, infos } = loadSourcesUploadInfos(image, { refetch });

  if (isLoading || error) return { isLoading, error, sources: [] };
  const filteredSources = image.isTesting ? infos : infos.filter(providerSourceFilter(image));

  return { isLoading, error, sources: filteredSources };
};
