'use strict';

var express = require('express');
var router = express.Router();
var connector = require('../chaincode-connector/EVChargerConnector')

/* GET query listing. */
router.get('/all', async function(req, res, next) {
    const result = await connector.getAllDevices();
    res.json(result); 
});

router.get('/device', async function(req, res, next) {
    //let queryObj = req.query;
    const result = await connector.getDevice(req.body.deviceId);
    res.json(result); 
});


module.exports = router;