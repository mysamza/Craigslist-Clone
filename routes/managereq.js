'use strict';
var express = require('express');
var Ad = require('../models/ad.model.js');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {


    Ad.find({ username: req.session.user.username}).sort({ date: -1 }).exec(function (err, ads) {
        
        if (err) {
            console.log(err);
        }
        else {
            res.render('managereq', { ads: ads });
        }


    });
    

            //Ad.find({username: req.session.user.username}, function (err, ads) {
             
            //    if (err) {
            //        console.log(err);
            //    }
            //    else { res.render('managereq', { ads: ads }); }

            //});




});


router.get('/pendingapproval', function (req, res) {

    Ad.find({status: "pendingapproval"}, function (err, pendingads) {

        if (err) {
            console.log(err);
        }
        else {
            res.render('managereq', { pendingads: pendingads });
        }

    });

});

module.exports = router;
