import PropTypes from 'prop-types';
import React from 'react';
import { useQuery, useQueries } from 'react-query';

import { SOURCES_QUERY_KEY, SOURCE_UPLOAD_INFO_KEY } from '../../../API/queryKeys';
import { fetchSourcesList, fetchSourceUploadInfo } from '../../../API';
import { AWS_PROVIDER, AZURE_PROVIDER } from '../../../constants';

export const imageProps = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string,
  provider: PropTypes.string,
  architecture: PropTypes.string,
  sourceIDs: PropTypes.arrayOf(PropTypes.string),
  accountIDs: PropTypes.arrayOf(PropTypes.string),
}).isRequired;

export const useSourcesData = (provider, { refetch = false } = {}) => {
  const {
    error,
    isLoading,
    data: sources,
  } = useQuery([SOURCES_QUERY_KEY, provider], () => fetchSourcesList(provider), {
    enabled: !!provider,
    refetchInterval: refetch && 10000,
  });
  return { error, isLoading, sources };
};

const useSourcesUploadInfos = (provider, { refetch }) => {
  const { sources, isLoading: isLoadingSources, error: sourcesError } = useSourcesData(provider, { refetch });

  const uploadInfos = useQueries(
    sources?.map((source) => ({ queryKey: [SOURCE_UPLOAD_INFO_KEY, source.id], queryFn: () => fetchSourceUploadInfo(source.id), retry: 1 })) || []
  );

  const isLoading = isLoadingSources || uploadInfos.some((info) => info.isLoading);
  const infos = [];
  !isLoading &&
    sources?.forEach((source, i) => {
      uploadInfos[i].isSuccess && infos.push({ ...uploadInfos[i].data, ...source });
    });

  return { isLoading, error: sourcesError, infos };
};

const providerSourceFilter = (image) => {
  switch (image.provider) {
    case AWS_PROVIDER:
      return (info) => image.sourceIDs?.includes(info.id) || image.accountIDs?.includes(info.aws.account_id);
    case AZURE_PROVIDER:
      return (info) => image.uploadOptions?.source_id === info.id || info.azure?.subscription_id === image.uploadOptions?.subscription_id;
    default:
      return (info) => image.sourceIDs?.includes(info.id);
  }
};

export const useSourcesForImage = (image, { refetch = false, onSuccess = () => {} } = {}) => {
  const { isLoading, error, infos } = useSourcesUploadInfos(image.provider, { refetch });

  React.useEffect(() => {
    if (!isLoading && !error) {
      onSuccess(filteredSources);
    }
  }, [isLoading, error]);

  const filteredSources = image.isTesting ? infos : infos?.filter(providerSourceFilter(image));
  return { isLoading, error, sources: filteredSources || [] };
};
