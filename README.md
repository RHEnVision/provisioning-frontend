# provisioning-frontend

Provisioning frontend service for `console.redhat.com`.

## Development
This project is based on react and uses the `console.redhat.com` micro-frontend architecture

- [patternfly](https://www.patternfly.org/v4/) - an opinionated UX/UI library for enterprise applications
- [insights-chrome](https://github.com/RedHatInsights/insights-chrome) - a wrapper that provides an api for the global application (menus / auth / etc)
- [react-query](https://react-query.tanstack.com) - Manages the server state
- [react-tracked](https://react-tracked.js.org) - Optimizes re-renders for a global state management

For further reading see [dev](https://github.com/RHEnVision/provisioning-frontend/blob/main/docs/dev.md)

## Setup

### Containerized development environment

For a containerized development environment, including provisioning-backend, db, redis, kafka and other integrated services, for further guidance, go to the [provisioning-compose](https://github.com/RHEnVision/provisioning-compose) repo.
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

Update `fec.config.json` according to your application URL. [Read more](http://front-end-docs-insights.apps.ocp4.prod.psi.redhat.com/ui-onboarding/fec-binary#Configuration)[Older webpack config](https://github.com/RedHatInsights/frontend-components/tree/master/packages/config#useproxy).

### Setting up dependencies

The apps config is downloaded from environment you run in,
but you can stub that by running cloud-services-config locally

The guide for running it is at https://github.com/RedHatInsights/cloud-services-config#testing-your-changes-locally.

To run with another app you can easily run one app just for serving static assets and the other as the main app.
Pointing the asset route to the statically served assets of the second app.

#### Image builder with Provisioning static assets


Run Provisioning frontend with `npm run start:federated`.

Optionally to test environments provisioning is not yet in, run the cloud-services-config by `npx http-server -p 8889`.

Add these lines to IB's `dev.webpack.config.js`

```diff
diff --git a/config/dev.webpack.config.js b/config/dev.webpack.config.js
index 948d2d7..63c16d8 100644
--- a/config/dev.webpack.config.js
+++ b/config/dev.webpack.config.js
@@ -12,6 +12,12 @@ const webpackProxy = {
   appUrl: process.env.BETA
     ? '/beta/insights/image-builder'
     : '/insights/image-builder',
+  routes: {
+    '/apps/provisioning': { host: "http://localhost:8003" },
+    '/api/provisioning': { host: "http://localhost:8000" },
+    '/config/chrome': { host: 'http://localhost:8889' }
+  }
   };
```

Run image builder by `STAGE=true npm run prod-stable`.

The app is now running at https://stage.foo.redhat.com:1337/insights/image-builder

## Testing
This project uses jest, react-testing-library and msw

`npm run verify` will run `npm run lint` (eslint) and `npm test` (Jest)
You can also run `npm run lint:js:fix` for auto lint fixing
For further reading, see [testing](https://github.com/RHEnVision/provisioning-frontend/blob/main/docs/testing.md) guide
