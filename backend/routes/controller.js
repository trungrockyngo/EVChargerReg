'use strict';

var express = require('express');
var router = express.Router();
var connector = require('../chaincode-connector/EVChargerConnector')

/* GET query listing. */
router.get('/all', async function(req, res, next) {
    const result = await connector.getAllControllers()
    res.json(result); 
});

router.post('/register', async function(req, res, next) {
    //let queryObj = req.query;
    const result = await connector.registerController(req.body.controllerName, req.body.serviceProvider, req.body.location.long, req.body.location.lat);
    res.json(result); 
});

router.get('/devices', async function(req, res, next) {
    const result = await connector.getControllerDevices(req.body.controllerId);
    res.json(result); 
});


module.exports = router;
