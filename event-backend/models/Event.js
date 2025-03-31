const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    event_id: String,  
    prn: String,
    name: String,
    year: String,
    div: String,
    event: String,
    date: String,
    time: String,
    venue: String,
    faculty: String,
    certificate: String
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
