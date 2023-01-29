import PropTypes from 'prop-types';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchAWSInstances } from '../../API';
import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { Bullseye, ClipboardCopy, Spinner, Button, Stack, StackItem } from '@patternfly/react-core';
import { RedoIcon } from '@patternfly/react-icons';

const instanceLink = (id) => `https://console.aws.amazon.com/ec2/home?region=us-east-1#InstanceDetails:instanceId=${id}`;

const InstancesTable = ({ reservationID, onClose }) => {
  const { isLoading, data: instances, refetch } = useQuery(['instances', reservationID], () => fetchAWSInstances(reservationID));

  return (
    <Stack>
      <StackItem>
        <Bullseye>
          <TableComposable aria-label="Simple table" variant="compact">
            <Thead>
              <Tr>
                <Th width={25}>ID</Th>
                <Th>DNS</Th>
                <Th>IPv4</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading && (
                <Tr>
                  <Td colSpan={8}>
                    <Bullseye>
                      <Spinner />
                    </Bullseye>
                  </Td>
                </Tr>
              )}
              {instances?.map((instance) => (
                <Tr key={instance.id}>
                  <Td dataLabel="ID">
                    <a href={instanceLink(instance.id)} rel="noreferrer" target="_blank">
                      {instance.id}
                    </a>
                  </Td>
                  <Td modifier="truncate" dataLabel="DNS">
                    <ClipboardCopy hoverTip="Copy" clickTip="Copied" variant="inline-compact" isCode>
                      {instance.dns}
                    </ClipboardCopy>
                  </Td>
                  <Td modifier="truncate" dataLabel="IPv4">
                    <ClipboardCopy hoverTip="Copy" clickTip="Copied" variant="inline-compact">
                      {instance.ipv4}
                    </ClipboardCopy>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </TableComposable>
        </Bullseye>
      </StackItem>
      <StackItem>
        <Bullseye>
          <Button onClick={refetch} variant="link">
            <span>
              Refresh <RedoIcon />
            </span>
          </Button>
          <Button variant="link" onClick={onClose}>
            Close
          </Button>
        </Bullseye>
      </StackItem>
    </Stack>
  );
};

InstancesTable.propTypes = {
  reservationID: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InstancesTable;
