import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalVariant } from '@patternfly/react-core';

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => (
  <Modal
    ouiaId="app-confirm-modal"
    id="app-confirm-modal"
    aria-label="confirm cancel of launch modal"
    variant={ModalVariant.small}
    title="Exit instance launching?"
    isOpen={isOpen}
    onClose={onCancel}
    actions={[
      <Button key="exit" variant="primary" onClick={onConfirm} ouiaId="btn-exit-confirm">
        Exit
      </Button>,
      <Button key="stay" variant="link" onClick={onCancel}>
        Stay
      </Button>,
    ]}
    titleIconVariant="warning"
  >
    All inputs will be discarded.
  </Modal>
);

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmModal;
