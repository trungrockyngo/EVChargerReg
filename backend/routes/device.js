'use strict';

var express = require('express');
var router = express.Router();
const connector = require('../endpoint/mapping')

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

router.post('/update', async function(req, res, next) {
    const result = await connector.updateDevice(req.body.deviceId, req.body.currentTemp);
    res.json(result); 
});

router.post('/updateStatus', async function(req, res, next) {
    const result = await connector.updateDeviceStatus(req.body.deviceId);
    res.json(result); 
});

module.exports = router;