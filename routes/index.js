'use strict';
var express = require('express');
var Ad = require('../models/ad.model.js');
var moment = require('moment');
var router = express.Router();
var User = require('../models/user.model.js');

/* GET home page. */
router.get('/', function (req, res) {


    Ad.find({ adstatus: 'approved' }).sort({ approvaldate: 'desc' }).exec(function (err, approvedads) {
        if (err) {
            console.log(err);
        }

        else {

            approvedads.adsince = moment(approvedads.creationdate).fromNow();

            res.render('index', { approvedads: approvedads });
            //User.find({_id: req.session.user._id}).exec(function ( err, currentuser){
            //    if (err) { console.log(err) }
            //    else {
            //        res.render('index', { approvedads: approvedads});
            //    }


            //});


            
        }

        
    });


   
});

module.exports = router;


