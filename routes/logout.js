'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res) {

    if (req.session) {

        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            }
            else { res.redirect('/'); }
        });
    }


});

module.exports = router;
