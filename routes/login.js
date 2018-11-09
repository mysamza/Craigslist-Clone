'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user.model.js');
var app = require('../app');
var session = require('express-session');
var Ad = require('../models/ad.model.js');
/* GET signup page. */
router.get('/', function (req, res, next) {
    res.render('login');

});

router.post('/', function (req, res, next) {

    
   
   
    User.findOne({ email: req.body.email }, function (err, user) {
     
        if (err) {
            console.log(err);
        }

        else if (!user) {
          
            res.render('signup', { errnoacc: 'User does not exist! Please register.' });
        }

        else if (user && req.body.password == user.password) {
            req.session.user = user;
            req.session.loggedIn = true;
            req.session.save();
    
            if (req.session.attemptedpost) {

                res.redirect('posts/' + req.session.attemptedpost);
            }

            else { console.log(req.session.user.notification.notidata); res.redirect('/');}
          
           //res.redirect('adreqform');

        }
        else {   res.render('login', { errpass: 'Password does not match. Please try again!' });}
       
  
    });


    //if (req.body.email && req.body.password) {
    //    User.authenticate(req.body.email, req.body.password, function (err, user) {

    //        if (err || !user) {
    //            console.log(err)
    //        } else {
    //            req.session.userId = user._id;
    //            return res.redirect('dashboard');
    //        }

    //    });

    //}
    //else {
    //    var err = new Error('Email and password and required');
    //    console.log('I am not getting the data')
    //    err.status = 401
    //    return next(err);
    //}


});

module.exports = router;
