'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user.model.js');
var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId();
/* GET signup page. */
router.get('/', function (req, res) {
    res.render('signup');
});

/* POST new user into db*/
router.post('/', function (req, res) {


    /* Check if the username is taken. Send back error
        Check if email exists. Send back error.




    */

    User.findOne({ username: req.body.username }, function (err, user) {

        if (err) { console.log(err); }
        else if (user) {
            res.render('signup', { errusername: 'Username taken!', username: user.username});
        }
        else if (!user) {
            User.findOne({ email: req.body.email }, function (err, user2) {

                if (err) {
                    console.log(err);
                }
                else if (user2) {
                    res.render('signup', { erremail: 'Email already registered please log in' });
                }
                else if (!user2) {
                    var user3 = {

                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        country: req.body.country


                    };

                    var newuser = new User(user3);
                    newuser.save(function (err, newuser) {
                        if (err) {
                            console.log(err);

                        }
                        req.session.user = newuser;
                        req.session.loggedIn = true;
                        req.session.save();

                        User.findOneAndUpdate({ _id: newuser.id }, { $push: { "notification.notidata.0.data.heading": 'Welcome to Majhourati Marketplace', "notification.notidata.0.notiId": id }, $set: {"notification.counter": 1 }}, { new: true }, function (err, post) {

                            if (err) { console.log(err) }
                            else {
                                req.session.user = post;
                              
                                res.redirect('/');

                            }

                        });

                      


                    });
                }

            });

        }

    });




});

module.exports = router;



