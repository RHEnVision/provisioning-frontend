import PropTypes from 'prop-types';
import React from 'react';
import { AWS_PROVIDER, GCP_PROVIDER } from '../../../Common/constants';
import { defaultRegionByProvider } from '../../../Common/helpers';
import { useWizardContext } from '../../../Common/WizardContext';
import AWS from './aws';
import GCP from './gcp';

const AccountCustomizations = ({ setStepValidated, architecture, composeID, provider }) => {
  const [, setWizardContext] = useWizardContext();

  React.useEffect(() => {
    provider &&
      setWizardContext((prevState) => ({
        ...prevState,
        provider,
        chosenRegion: defaultRegionByProvider(provider),
        chosenImageID: composeID,
      }));
  }, [provider, setWizardContext]);

  switch (provider) {
    case AWS_PROVIDER:
      return <AWS setStepValidated={setStepValidated} architecture={architecture} composeID={composeID} />;
    case GCP_PROVIDER:
      return <GCP setStepValidated={setStepValidated} architecture={architecture} composeID={composeID} />;
    default:
      undefined;
  }
};

AccountCustomizations.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
  architecture: PropTypes.string.isRequired,
  composeID: PropTypes.string.isRequired,
  provider: PropTypes.oneOf([AWS_PROVIDER, GCP_PROVIDER]),
};

export default AccountCustomizations;
