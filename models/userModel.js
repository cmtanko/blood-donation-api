var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    phone: { type: String },
    age: { type: String },
    profilePic: { type: String },
    sex: { type: String },
    bloodGroup: { type: String },
    club: { type: String },
    address: { type: String },
    isAvailable: { type: Boolean, default:false },
    notes: { type: String }
});

module.exports = mongoose.model('User', userModel);