const instanceLink = (instanceID, provider, region) => {
  switch (provider) {
    case 'aws':
      return `https://console.aws.amazon.com/ec2/home?region=${region}#InstanceDetails:instanceId=${instanceID}`;
    default:
      return null;
  }
};

export default instanceLink;
