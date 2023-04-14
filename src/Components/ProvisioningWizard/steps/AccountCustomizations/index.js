import PropTypes from 'prop-types';
import React from 'react';
import { AWS_PROVIDER, AZURE_PROVIDER, GCP_PROVIDER } from '../../../Common/constants';
import { imageProps } from '../../helpers';
import { defaultRegionByProvider } from '../../../Common/helpers';
import { useWizardContext } from '../../../Common/WizardContext';
import AWS from './aws';
import GCP from './gcp';
import Azure from './azure';

const AccountCustomizations = ({ setStepValidated, image }) => {
  const [, setWizardContext] = useWizardContext();
  const provider = image.provider;

  React.useEffect(() => {
    provider &&
      setWizardContext((prevState) => ({
        ...prevState,
        provider,
        chosenRegion: defaultRegionByProvider(provider),
        chosenImageID: image.id,
      }));
  }, [provider, setWizardContext]);

  switch (provider) {
    case AWS_PROVIDER:
      return <AWS setStepValidated={setStepValidated} image={image} />;
    case AZURE_PROVIDER:
      return <Azure setStepValidated={setStepValidated} image={image} />;
    case GCP_PROVIDER:
      return <GCP setStepValidated={setStepValidated} image={image} />;
    default:
      throw new Error(`Can not render AccountCustomizations for unrecognized provider: ${provider}`);
  }
};

AccountCustomizations.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
  image: imageProps,
};

export default AccountCustomizations;
