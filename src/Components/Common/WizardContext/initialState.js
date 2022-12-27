const initialWizardContext = {
  chosenSource: undefined,
  //TODO: should be undefined? 
  chosenProvider: 'aws',
  chosenNumOfInstances: 1,
  chosenInstanceType: undefined,
  uploadedKey: false,
  chosenRegion: 'us-east-1',
  sshPublicName: '',
  sshPublicKey: '',
  chosenSshKeyId: undefined,
  chosenSshKeyName: null,
};

export default initialWizardContext;
