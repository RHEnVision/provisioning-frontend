import PropTypes from 'prop-types';
import React from 'react';
import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { Button, ClipboardCopy, Card, Pagination, Spinner, Bullseye } from '@patternfly/react-core';
import { useQuery } from '@tanstack/react-query';

import { SSHUsername } from './helpers';
import { instanceLink, humanizeInstanceID } from '../Common/instanceHelpers';
import { fetchReservationByProvider } from '../../API';

const PER_PAGE_OPTIONS = [
  { title: '5', value: 5 },
  { title: '10', value: 10 },
  { title: '20', value: 20 },
  { title: '50', value: 50 },
];
const InstancesTable = ({ reservationID, provider, region }) => {
  const [paginationOptions, setPaginationOptions] = React.useState({ perPage: 5, page: 1, startIdx: 0, endIdx: 5 });
  const { data: instances, isLoading } = useQuery(['launchInfo', reservationID], () => fetchReservationByProvider(reservationID, provider), {
    select: (reservation) => reservation?.instances,
  });

  const onSetPage = (_, newPage, perPage, startIdx, endIdx) => {
    setPaginationOptions({ perPage, page: newPage, startIdx, endIdx });
  };

  const onPerPageSelect = (_, newPerPage, newPage, startIdx, endIdx) => {
    setPaginationOptions((prevOptions) => ({ ...prevOptions, perPage: newPerPage, page: newPage, startIdx, endIdx }));
  };

  const instancesPerPage = instances?.slice(paginationOptions.startIdx, paginationOptions.endIdx);
  const atLeastOneDetailNotEmpty = instancesPerPage?.some((instance) => instance.detail?.public_dns?.length > 0);

  if (isLoading)
    return (
      <Bullseye>
        <Spinner isSVG size="xl" />
      </Bullseye>
    );
  return (
    <Card style={{ position: 'relative', marginLeft: '-20%', marginRight: '-20%' }}>
      <Pagination
        itemCount={instances?.length || 0}
        page={paginationOptions.page}
        onSetPage={onSetPage}
        perPage={paginationOptions.perPage}
        onPerPageSelect={onPerPageSelect}
        perPageOptions={PER_PAGE_OPTIONS}
        isCompact
        ouiaId="instances-pagination"
      />
      <TableComposable ouiaId="instances table" aria-label="instances description table" variant="compact">
        <Thead>
          <Tr>
            <Th>ID</Th>
            {atLeastOneDetailNotEmpty && <Th>DNS</Th>}
            <Th>SSH command</Th>
          </Tr>
        </Thead>
        <Tbody>
          {instancesPerPage?.map(({ instance_id, detail }) => (
            <Tr key={instance_id}>
              <Td aria-label="instance id" dataLabel="ID">
                <Button
                  variant="link"
                  icon={<ExternalLinkAltIcon />}
                  iconPosition="right"
                  isInline
                  component="a"
                  rel="noreferrer"
                  target="_blank"
                  href={instanceLink(instance_id, provider, region)}
                >
                  {humanizeInstanceID(instance_id, provider)}
                </Button>
              </Td>
              {atLeastOneDetailNotEmpty && (
                <Td aria-label="instance dns" dataLabel="DNS">
                  {detail?.public_dns ? (
                    <ClipboardCopy isReadOnly hoverTip="Copy DNS" clickTip="DNS was copied!" variant="expansion">
                      {detail?.public_dns}
                    </ClipboardCopy>
                  ) : (
                    'N/A'
                  )}
                </Td>
              )}
              <Td aria-label="ssh command" dataLabel="SSH">
                {detail?.public_ipv4 ? (
                  <ClipboardCopy isReadOnly hoverTip="Copy SSH command" clickTip="SSH was copied!" variant="expansion">
                    {`ssh ${SSHUsername(provider)}@${detail?.public_ipv4}`}
                  </ClipboardCopy>
                ) : (
                  'N/A'
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </Card>
  );
};

InstancesTable.propTypes = {
  provider: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  reservationID: PropTypes.number.isRequired,
};

export default InstancesTable;
