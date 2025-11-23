const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 250
    },
    details: {
        type: String,
        maxlength: 1000
    },
    on: Date,
    venue: {
        type: String,
        maxlength: 100
    },
    registrationLink: {
        type: String,
        maxlength: 250
    }
});

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;