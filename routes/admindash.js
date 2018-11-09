'use strict';
var express = require('express');
var router = express.Router();
var Ad = require('../models/ad.model.js');
var User = require('../models/user.model.js');

/* GET users listing. */
router.get('/', function (req, res) {

  

    Ad.find().sort({ creationdate: -1 }).exec(function (err, ads) {
        if (err) {
            console.log(err);
        }

        else {



            res.render('admindash', { ads: ads });
        }


    });






});

router.get('/approvepost/:id', function (req, res) {

    var id = req.params.id;
    
    //this is the id of the AD who's status should be changed to approved.

    //Ad.findByIdAndUpdate(id, { adstatus: 'approved', approvaldate: new Date()}, {new: true}, function (err, ad) {

    //    if (err) { console.log(err) }
    //    else {

    //        //You find the user's document by the Ad.username and then insert to notidata.para Your Ad.heading has been approved.

    //        function notiplusplus(user) {

    //            //var plused = user.notification.counter + 1;

    //            var userobject = User.find({ username: user }, function (err, lol) {
    //                if (err) { console.log(err) }
    //                else return lol._id;

    //            });
    //            console.log(userobject)
    //            throw new Error("Stop");

    //            User.findOneAndUpdate({ username: user }, { $set: { "notification.counter": user.notification.counter + 1 } }, { new: true }, function (err, post) {

    //                if (err) { console.log(err) }
    //                else {

    //                    console.log(post + " This is the user that wrote the post and we will update it's notidata")
    //                    throw new Error("Stop");
    //                    //req.session.user = post;
    //                    //req.session.save();

    //                }

    //            });

               
    //        };
    //        notiplusplus(ad.username);


    //        res.redirect('/admindash');

           
    //    }


    //});

    Ad.findByIdAndUpdate(id, { adstatus: 'approved', approvaldate: new Date() }, { new: true }, function (err, ad) {

        if (err) { console.log(err) }
        else {

            User.find({ username: ad.username }, function (err, userreturned) {
                if (err) {
                    console.log(err)
                }
                else {
              
                    const plussed = userreturned[0].notification.counter + 1;
                    User.findOneAndUpdate({ username: userreturned[0].username }, {
                        $set: { "notification.counter": plussed }, $push: {
                            "notification.notidata": {
                                "$each": [{ data: { para: "Your Ad " + "'" + ad.heading + "'" + " has been approved!" } }],
                                "$sort": { "notidate": -1 }
                            }
                        }
                    }, { new: true }, function (err, x) {

                        if (err) {
                            console.log(err)
                        }
                        else {
                       
                            res.redirect('/admindash');
                        }


                    })


                }

            });

        }

    });


});

router.get('/unapprovepost/:id', function (req, res) {

    var id = req.params.id;
    console.log(id);
    //this is the id of the AD who's status should be changed to approved.

    Ad.findByIdAndUpdate(id, { adstatus: 'unapproved', approvaldate: "Null" }, { new: true }, function (err, ad) {

        if (err) { console.log(err) }
        else {

            res.redirect('/admindash');


        }


    });


});

module.exports = router;
