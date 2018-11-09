'use strict';
var debug = require('debug');
var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars')
var mongoose = require('mongoose');
var session = require('express-session');
var moment = require('moment');
var helpers = require('handlebars-helpers')();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, callback) {
        callback(null, file.filename + '-' + path.extname(file.originalname));

    }


});

var upload = multer({ storage: storage }).single('img_');

var db = require('./dbconn');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('we are connected!');
});


var index = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var login = require('./routes/login');
var adreqform = require('./routes/adreqform');
var dashboard = require('./routes/dashboard');
var logout = require('./routes/logout');
var posts = require('./routes/posts');
var managereq = require('./routes/managereq');
var admindash = require('./routes/admindash');
var profile = require('./routes/profile');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'layout' }));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'gh jewellery',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }


}));


app.use(function (req, res, next) {
    console.log('middleware was called');
    res.locals.session = req.session;
    req.session.LoggedIn = false;
   
    next();
}); 


app.use('/', index);
app.use('/users', users);
app.use('/dashboard', dashboard);
app.use('/signup', signup);
app.use('/login', login);
app.use('/adreqform', adreqform);
app.use('/logout', logout);
app.use('/posts', posts);
app.use('/managereq', managereq);
app.use('/admindash', admindash);
app.use('/profile', profile);






// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

module.exports = app;

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
  

});
