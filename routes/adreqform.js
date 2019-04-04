'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId();
var mv = require('mv');
var fsex = require('fs-extra')
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var Ad = require('../models/ad.model.js');
var User = require('../models/user.model.js');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: 'public/images/',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + Math.random() + path.extname(file.originalname));

    }


});

var upload = multer({ storage: storage });


/* GET users listing. */
router.get('/', function (req, res) {
    res.render('adreqform');
});


router.post('/', upload.array('img_', 1), function (req, res) {

    console.log(req.file)
    console.log(req.files)
    

    //for (var i = 0; i < 3; i++) {

    //    fs.rename('public/images/img_.jpg', 'public/images/' + global.latestad + '.jpg', function (err) {
    //        if (err) { console.log(err); }
    //        else {
    //            req.files[i].filename = i;
    //        }
           
    //    }

            
    //    )
    //};      


    

    if (req.session.loggedIn) {

        var dateObj = new Date();
        var locale = "en-us";
        var month = dateObj.toLocaleString(locale, { month: "long" });
        var datee = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var day = dateObj.getDay();


        var displaydate = datee + " " + month + " " + year;

        var ad = {

            heading: req.body.heading,
            deliverby: req.body.date,
            metal: req.body.metal,
            weight: req.body.weight,
            unit: req.body.unit,
            opdesc: req.body.opdesc,
            userobjid: req.session.user._id,
            username: req.session.user.username,
            deliverydate: req.body.date,
            creationdate: new Date(),
            displaydate: displaydate,
            approvaldate: null
            
           
        }


        
        var newad = new Ad(ad);
        newad.save(function (err, newad) {
            if (err) {
                console.log(err);

            } else {

                Ad.findOne({}, {}, { sort: { 'creationdate': -1 } }, function (err, latestad) {
                    global.latestad = latestad._id;
                   
                    mkdirp('/Users/mesam/source/repos/JewelryMP/JewelryMP/public/images/' + global.latestad, function (err) {
                        if (err) console.error(err)
                        else {
                            fs.rename('public/images/' + req.files[0].filename, 'public/images/' + global.latestad + '.jpg', function (err) {
                                if (err) console.log('ERROR: ' + err);
                                else {
                                    fsex.move('/Users/mesam/source/repos/JewelryMP/JewelryMP/public/images/' + global.latestad + '.jpg', '/Users/mesam/source/repos/JewelryMP/JewelryMP/public/images/' + global.latestad + '/img1.jpg', function (err) {
                                        if (err) return console.error(err)
                                        else {
                                            Ad.findByIdAndUpdate(latestad, { $push: { imgdest: 'img1.jpg' } }, { new: true }, function (err, w) {

                                                if (err) { console.log(err) }
                                                else {





                                                    fs.rename('public/images/' + req.files[1].filename, 'public/images/' + global.latestad + '.jpg', function (err) {
                                                        if (err) { console.log(err) }
                                                        else {
                                                            fsex.move('/Users/mesam/source/repos/JewelryMP/JewelryMP/public/images/' + global.latestad + '.jpg', '/Users/mesam/source/repos/JewelryMP/JewelryMP/public/images/' + global.latestad + '/img2.jpg', function (err) {
                                                                if (err) { console.log(err) }
                                                                else {
                                                                    Ad.findByIdAndUpdate(latestad, { $push: {imgdest: 'img2.jpg' } }, { new: true }, function (err, w) {
                                                                        if (err) { console.log(err) }
                                                                        else {
                                                                         
                                                                        }
                                                                    }
                                                                    )
                                                                };
                                                            }
                                                            )
                                                        };
                                                    }


                                                    )
                                                };


                                            });
                                        }
                                    })
                                }
                            });
                        }
                    });
                });
                function notiplusplus(user, cb) {



                    var plused = user.notification.counter + 1;


                    User.findOneAndUpdate({ _id: user._id }, { $set: { "notification.counter": plused } }, { new: true }, function (err, post) {

                        if (err) { console.log(err) }
                        else {
                            req.session.user = post;
                            req.session.save();



                        }

                    });
                    cb(req.session.user);
                };


                notiplusplus(req.session.user, function (user) {

                    Ad.findOne({}, {}, {
                        sort: { 'creationdate': -1 }
                    }, function (err, lastad) {

                        if (err) { console.log(err) }
                        else {
                            var thisad = lastad;
                        
                            User.findOneAndUpdate({ _id: user._id }, {
                                $push: {
                                    "notification.notidata": {
                                        "$each": [{ data: { para: "Your Ad " + "'" + thisad.heading + "'" + " has been successfully submitted." } }],
                                        "$sort": { "notidate": -1 }
                                    }
                                }}, { new: true }, function (err, df) {

                                if (err) { console.log(err) }
                                else {


                                    
                                  
                                    req.session.user = df;
                                    req.session.save();
                                    res.redirect('/');


                                }

                            });

                        }

                    });

                });
                
            }
           
        });


    }
    else console.log('User was not found');
  
});

router.get('/profile', function (req, res) {



});


module.exports = router;
