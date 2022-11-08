const config = {
  port: 3001, // Port to start server
  clingApiUrl: 'https://api.dev.cling.se', // Url to Cling API
  publicUrl: 'https://mypublicip:3001', // Url to this server (used for incoming webhooks, please also forward port if needed)
  authorization: 'JWT a.b.c', // JWT used to authenticate as a partner to Cling
}

module.exports = config;
