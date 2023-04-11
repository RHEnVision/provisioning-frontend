/* global module, __dirname */
const { resolve } = require('path');

module.exports = {
  appUrl: '/insights/provisioning',
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  /**
   * Change to false after your app is registered in configuration files
   */
  interceptChromeConfig: true,
  /**
   * Add additional webpack plugins
   */
  plugins: [],
  routesPath: process.env.ROUTES_PATH && resolve(process.env.ROUTES_PATH),
  moduleFederation: {
    exposes: {
      './RootApp': resolve(__dirname, './src/AppEntry'),
      './ProvisioningWizard': resolve(__dirname, './src/Components/ProvisioningWizard')
    }
  }
};
