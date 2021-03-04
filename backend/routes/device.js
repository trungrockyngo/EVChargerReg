'use strict';

var express = require('express');
var router = express.Router();
var connector = require('../chaincode-connector/EVChargerConnector')

/* GET query listing. */
router.get('/all', async function(req, res, next) {
    res.json('{"dummy":"test"}');
});

module.exports = router;