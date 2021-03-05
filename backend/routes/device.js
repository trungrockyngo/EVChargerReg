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

router.get('/controller', async function(req, res, next) {
    const result = await connector.getDeviceController(req.body.deviceID);
    res.json(result); 
});

router.post('/register', async function(req, res, next) {
    const result = await connector.registerDevice(req.body.brand, req.body.model, req.body.mac, req.body.powerType, req.body.location.long, req.body.location.lat);
    res.json(result); 
});

router.post('/executeCommand', async function(req, res, next) {
    const result = await connector.executeDeviceCommand(req.body.deviceID, req.body.command);
    res.json(result); 
});

module.exports = router;