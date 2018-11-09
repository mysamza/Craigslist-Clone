'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user.model.js');

/* GET users listing. */
router.get('/', function (req, res) {

    if (!req.session.user) {
        console.log('You are not logged in');
    }
   

        res.render('dashboard');


        
    
   


});



module.exports = router;
