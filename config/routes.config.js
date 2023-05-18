const LOCAL_API_PORT = 8000;
const PROV_API = process.env.PROV_API_HOST || 'localhost';

module.exports = {
  routes: {
    '/api/provisioning': { host: `http://${PROV_API}:${LOCAL_API_PORT}` },
  },
};
