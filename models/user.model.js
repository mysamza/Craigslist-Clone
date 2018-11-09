var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({

    username: String,
    email: String,
    password: String,
    company: String,
    contact: Number,
    country: String,
    isLoggedIn: Boolean,
    createdOn: { type: Date, default: Date.now },
    ads: [{ type: Schema.Types.ObjectId, ref: 'Ad' }],
    notification: {
        counter: Number,
        notidata: [{
            notiId: Schema.Types.ObjectId,
            notidate: { type: Date, default: Date.now },
            data: {
                heading: String,
                para: String
            },
            notistatus: {type: Boolean, default: false}
        }]
    }

});


var User = module.exports = mongoose.model('User', UserSchema);



