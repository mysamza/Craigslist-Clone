var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MPdb');


var db = module.exports = mongoose.connection;