# provisioning-frontend

Provisioning frontend service for `cloud.redhat.com`

## Development
This project is based on react and uses the `cloud.redhat.com` micro-frontend architecture

[patternfly](https://www.patternfly.org/v4/) - an opinionated UX/UI library for enterprise applications
[insights-chrome](https://github.com/RedHatInsights/insights-chrome) - a wrapper that provides an api for the global application (menus / auth / etc)
[react-query](https://react-query.tanstack.com) - Manages the server state
[react-tracked](https://react-tracked.js.org) - Optimizes re-renders for a global state management

For further reading see [dev](https://github.com/RHEnVision/provisioning-frontend/blob/main/docs/dev.md)

## Setup
### Initial etc/hosts setup

In order to access the https://[env].foo.redhat.com in your browser, you have to add entries to your `/etc/hosts` file. This is a **one-time** setup that has to be done only once (unless you modify hosts) on each machine.

To setup the hosts file run following command:
```bash
npm run patch:hosts
```

If this command throws an error run it as a `sudo`:
```bash
sudo npm run patch:hosts
```

### Getting started

1. ```npm install```

2. ```PROXY=true npm run start``` choose stage and then beta

3. Open browser in URL listed in the terminal output

Update `config/dev.webpack.config.js` according to your application URL. [Read more](https://github.com/RedHatInsights/frontend-components/tree/master/packages/config#useproxy).

## Testing
This project uses jest, react-testing-library and msw 

`npm run verify` will run `npm run lint` (eslint) and `npm test` (Jest)
You can also run `npm run lint:js:fix` for auto lint fixing
For further reading, see [testing](https://github.com/RHEnVision/provisioning-frontend/blob/main/docs/testing.md) guide
