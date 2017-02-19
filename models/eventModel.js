var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventModel = new Schema({
    title: { type: String },
    description: { type: String },
    date: { type: String },
    time: { type: String },
    venue: { type: String },
    picture: { type: String },
    interested: { type: String },
    non_interested: { type: String },
    comment: { type: String }
});

module.exports = mongoose.model('Event', eventModel);



