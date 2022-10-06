/* global module, __dirname */
const { resolve } = require('path');

module.exports = {
  appUrl: '/apps/provisioning',
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
  routes: {
    '/api/provisioning': { host: `http://localhost:8000` }
  },
  moduleFederation: {
    exposes: {
      './RootApp': resolve(__dirname, './src/AppEntry'),
      './ProvisioningWizard': resolve(__dirname, './src/Components/ProvisioningWizard')
    }
  }
};
