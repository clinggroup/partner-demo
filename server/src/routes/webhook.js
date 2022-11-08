const axios = require('axios');
const express = require('express');
const router = express.Router();
const config = require('../config');

// Please note that all routes in this file is added under /webhook

// Listen for incoming webhooks
router.post('/', async (req, res, next) => {
  try {
    // Security
    // TODO: Here you should probably verify basic auth
    // TODO: Here you should probably verify that the req was sent from trusted IPs
    const { type, companyId, data = {} } = req.body;

    console.log('Hook of type ' + type + ' for companyId ' + companyId + ', the document with id ' + data.id + ' is in status ' + data.status);

    return res.sendStatus(204); // We must OK the webhook so it will not be sent again
  } catch (err) {
    return next(err);
  }
});

/**
 * Setup a new webhook example
 * Quickly setup a new webhook by calling GET /webhook/setup
 * This is probably something you would prefer to setup in a REST-client such as Postman, Insomnia or by using cURL
 * but here is a route to get started quickly. If you run this multiple times please remember to remove duplicate
 * hooks manually or by using the other route.
 */
router.get('/setup', async (req, res, next) => {
  try {    
    const body = {
      type: 'document.accepted', // The type of event, example document.created or document.accepted
      isActive: true,
      url: config.publicUrl + '/webhook', // Url to sent POST to
      includePaths: ['id', 'status', 'companyId', 'data.name'],
      authType: 'basicauth',
      authData: {
        username: 'test',
        password: 'password',
      },
    };

    // Create a new webhook
    const { data } = await axios.post(config.clingApiUrl + '/partner/webhookSubscription', body, {
      headers: {
        Authorization: config.authorization,
      },
    });

    return res.json(data);
  } catch (err) {
    return next(err)
  }
});

/**
 * Remove all webhooks
 * Quickly remove all existing webhooks.
 */
router.get('/uninstall', async (req, res, next) => {
  try {    
    // Fetch current webhooks
    const { data } = await axios.get(config.clingApiUrl + '/partner/webhookSubscription', {
      headers: {
        Authorization: config.authorization,
      },
    });

    await Promise.all(data.map(async (webhookSubscription) => {
      const { id } = webhookSubscription;
      await axios.delete(config.clingApiUrl + '/partner/webhookSubscription/' + id, {
        headers: {
          Authorization: config.authorization,
        },
      });
    }));

    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
