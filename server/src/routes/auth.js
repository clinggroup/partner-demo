const axios = require('axios');
const express = require('express');
const router = express.Router();
const config = require('../config');
const db = require('../db');

// Please note that all routes in this file is added under /auth

// Init auth on the backend for a user specified in body
router.post('/', async (req, res, next) => {
  try {
    const { companyUser, company } = req.body;
    if (!companyUser) throw new Error('Missing companyUser in body');
    if (!company) throw new Error('Missing company in body');

    const { id, email } = companyUser;
    if (!id) throw new Error('Missing id in companyUser');
    if (!email) throw new Error('Missing email in companyUser');

    const { id: companyId, name } = company;
    if (!companyId) throw new Error('Missing id in company');
    if (!name) throw new Error('Missing name in company');


    const body = {
      companyUser: {
        id,
        email,
      },
      company: {
        id: companyId,
        name,
      }
    };

    console.log('Will now send body:', body);
    // Send signup or login with a specific user to Cling
    const { data } = await axios.post(config.clingApiUrl + '/partner/authCompanyUser', body, {
      headers: {
        Authorization: config.authorization,
      },
    });

    // Return the secret to the client
    return res.json({ authToken: data.authToken });
  } catch (err) {
    return next(err);
  }
});

// Init auth on the backend for a specific userId
// Send user data to Cling to exchange for a secret. Some demo user data is loaded from the db based on the userId provided
router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) throw new Error('Missing userId in query');

    const userData = db.userDb[userId];
    if (!userData) throw new Error('Could not find userData for userId ' + userId);
    
    const companyData = db.companyDb[userData.companyId];
    if (!userData) throw new Error('Could not find companyData');

    const body = {
      companyUser: {
        id: userId,
        email: userData.email,
      },
      company: {
        id: userData.companyId,
        name: companyData.name,
      }
    };

    console.log('Will now send body:', body);
    // Send signup or login with a specific user to Cling
    const { data } = await axios.post(config.clingApiUrl + '/partner/authCompanyUser', body, {
      headers: {
        Authorization: config.authorization,
      },
    });

    // Return the secret to the client
    return res.json({ authToken: data.authToken });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
