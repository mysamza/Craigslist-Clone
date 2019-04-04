'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user.model.js');

/* GET users listing. */
router.get('/allnotifications', function (req, res) {
    res.render('allnotifications');
});

router.post('/notiupdate', function (req, res) {

    var minused = 0;
    var usere = req.session.user;


    User.findOneAndUpdate({ _id: usere._id }, { $set: { "notification.counter": minused } }, { new: true }, function (err, post) {

        if (err) { console.log(err) }
        else {
            req.session.user = post;
            req.session.save();



        }

    });

});

module.exports = router;
