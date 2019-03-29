'use strict';

const express = require('express'),
      service = require('../services/products'),
      GaiaMiddlewares = require('../middlewares/gaia-middlewares');

const router = express.Router();

router.get('/', GaiaMiddlewares.verifyAdmToken, service.get);
router.post('/', GaiaMiddlewares.verifyAdmToken, service.post);
router.put('/:id', GaiaMiddlewares.verifyAdmToken, service.put);
router.delete('/:id', GaiaMiddlewares.verifyAdmToken, service.delete);

module.exports = router;