'use strict';

const express = require('express'),
      service = require('../services/user');

const router = express.Router();

router.post('/', service.login);
router.post('/newuser', service.newUser);

module.exports = router;