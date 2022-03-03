const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://mern-feetbook.herokuapp.com',
      changeOrigin: true,
    })
  );
};