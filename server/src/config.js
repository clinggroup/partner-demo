require('dotenv').config();

const config = {
  port: process.env.PORT || 3001, // Port to start server
  clingApiUrl: process.env.CLING_API_URL || 'https://api.dev.cling.se', // Url to Cling API
  publicUrl: process.env.PUBLIC_URL, // Url to this server (used for incoming webhooks, please also forward port if needed)
  authorization: process.env.AUTHORIZATION, // JWT used to authenticate as a partner to Cling
}

// console.log('Config used:', config);

if (!config.port) throw Error('Cannot start server, no port specified.');
if (!config.clingApiUrl) throw Error('Cannot start server, clingApiUrl specified.');
if (!config.publicUrl) console.log('Warning: No publicUrl specified, will not be able to test webhooks.');
if (!config.authorization) console.log('Warning: No authorization specified, will not be able to authenticate with ClingAPI.');

module.exports = config;
