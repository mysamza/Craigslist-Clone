'use strict';
var express = require('express');
var User = require('../models/user.model.js');
var router = express.Router();


/* GET users listing. */
router.get('/:id', function (req, res) {
    if (req.session.loggedIn == true) {

        User.findById(req.params.id, function (err, user) {

            if (err) { console.log(err) }
            else {
                res.render('profile', { user: user });
            }

        });

    }

    else {

       
        res.redirect('../login');
    }


});

module.exports = router;
