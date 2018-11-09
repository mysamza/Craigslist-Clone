'use strict';
var express = require('express');
var Ad = require('../models/ad.model.js');
var router = express.Router();


/* GET users listing. */
router.get('/:id', function (req, res) {
    
    if (req.session.loggedIn == true) {
       
        Ad.findById(req.params.id, function (err, ad) {

            if (err) { console.log(err) }
            else if (ad.adstatus == "unapproved") {

                res.render('postnotfound');
            }
            else {
                res.render('post', { ad: ad });
            }

        });

    }

    else {
    
        req.session.attemptedpost = req.params.id;
        res.redirect('../login');
    }


  

});

module.exports = router;
