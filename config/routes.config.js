const LOCAL_API_PORT = 8000;

module.exports = {
  routes: {
    '/api/provisioning': { host: `http://localhost:${LOCAL_API_PORT}` },
  },
};
