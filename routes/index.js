'use strict';
var express = require('express');
var Ad = require('../models/ad.model.js');
var moment = require('moment');
var router = express.Router();
var User = require('../models/user.model.js');
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function (req, res) {

    //setInterval(function () {
    //    request('https://uae.souq.com/ae-en/apple-iphone-8-with-facetime-64gb-4g-lte-space-grey-24051462/i/', function (err, res, html) {
    //        if (err) { console.log(err) }
    //        else {
    //            res.statusCode == 200;
    //            var $ = cheerio.load(html);
    //            console.log($('.sk-clr1').text());


    //        }


    //    })
    //}, 10000);

  

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


