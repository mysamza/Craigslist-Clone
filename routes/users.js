'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/allnotifications', function (req, res) {
    res.render('allnotifications');
});

module.exports = router;
