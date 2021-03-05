'use strict';

var express = require('express');
const router = express.Router();
const connector = require('../endpoint/mapping')

router.get('/all', async function(req, res, next) {
    const result = await connector.getAllControllers()
    res.json(result); 
});

router.post('/register', async function(req, res, next) {
    //let queryObj = req.query;
    const result = await connector.registerController(req.body.controllerName, req.body.serviceProvider, req.body.location.long, req.body.location.lat);
    res.json(result); 
});

router.post('/update', async (req, res, next) => {
    const result = await connector.updateController(req.body.controllerID, req.body.serviceProvider, req.body.location.long, req.body.location.lat);
});

router.post('/change', async (req, res, next) => {
    const result = await connector.changeController(req.body.deviceID, req.body.newControllerID);
});

router.post('/assign', async (req, res, next) => {
    const result = await connector.ass(req.body.controllerID, req.body.serviceProvider, req.body.location.long, req.body.location.lat);
});

module.exports = router;
