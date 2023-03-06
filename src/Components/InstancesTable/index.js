import PropTypes from 'prop-types';
import React from 'react';
import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { ClipboardCopy, Card, Pagination } from '@patternfly/react-core';
import { useQuery } from 'react-query';

import { SSHUsername } from './helpers';
import instanceLink from '../Common/InstanceLink';
import { fetchReservationByProvider } from '../../API';

const PER_PAGE_OPTIONS = [
  { title: '5', value: 5 },
  { title: '10', value: 10 },
  { title: '20', value: 20 },
  { title: '50', value: 50 },
];
const InstancesTable = ({ reservationID, provider, region }) => {
  const [paginationOptions, setPaginationOptions] = React.useState({ perPage: 5, page: 1, startIdx: 0, endIdx: 5 });
  const { data: instances } = useQuery(['launchInfo', reservationID], () => fetchReservationByProvider(reservationID, provider), {
    select: (reservation) => reservation?.instances,
  });

  const onSetPage = (_, newPage, perPage, startIdx, endIdx) => {
    setPaginationOptions({ perPage, page: newPage, startIdx, endIdx });
  };

  const onPerPageSelect = (_, newPerPage, newPage, startIdx, endIdx) => {
    setPaginationOptions((prevOptions) => ({ ...prevOptions, perPage: newPerPage, page: newPage, startIdx, endIdx }));
  };

  const instancesPerPage = instances?.slice(paginationOptions.startIdx, paginationOptions.endIdx);

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
            <Th>DNS</Th>
            <Th>SSH command</Th>
          </Tr>
        </Thead>
        <Tbody>
          {instancesPerPage?.map(({ instance_id, detail }) => (
            <Tr key={instance_id}>
              <Td aria-label="instance id" dataLabel="ID">
                <a href={instanceLink(instance_id, provider, region)} rel="noreferrer" target="_blank">
                  <span>
                    {instance_id} <ExternalLinkAltIcon />
                  </span>
                </a>
              </Td>
              <Td aria-label="instance dns" dataLabel="DNS">
                {detail?.public_dns ? (
                  <ClipboardCopy isReadOnly hoverTip="Copy DNS" clickTip="DNS was copied!" variant="expansion">
                    {detail?.public_dns}
                  </ClipboardCopy>
                ) : (
                  'N/A'
                )}
              </Td>
              <Td dataLabel="SSH">
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
