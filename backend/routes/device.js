'use strict';

var express = require('express');
var router = express.Router();
const connector = require('../endpoint/mapping')

/* GET query listing. */
router.get('/all', async function(req, res, next) {
    res.json('{"dummy":"test"}');
});

module.exports = router;