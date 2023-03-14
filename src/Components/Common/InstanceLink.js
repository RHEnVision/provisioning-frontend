const instanceLink = (instanceID, provider, region) => {
  switch (provider) {
    case 'aws':
      return `https://console.aws.amazon.com/ec2/home?region=${region}#InstanceDetails:instanceId=${instanceID}`;
    case 'azure':
      return `https://portal.azure.com/#@rhdevcloudops.onmicrosoft.com/resource${instanceID}/overview`;
    default:
      return null;
  }
};

export default instanceLink;
