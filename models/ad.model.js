var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AdSchema = new Schema({


    heading: String,
    deliverydate: String,
    metal: String,
    weight: Number,
    unit: String,
    creationdate: Date,
    displaydate: String,
    adsince: String,
    opdesc: String,
    userobjid: { type: Schema.Types.ObjectId, ref: 'User' },
    username: String,
    adstatus: { type: String, default: "unapproved" },
    approvaldate: Date,
    imgdest: [{type: String, default: "Null"}]
});

var Ad = module.exports = mongoose.model('Ad', AdSchema);




