const mongoose = require("mongoose");

const ApprovedStudentSchema = new mongoose.Schema({
    event_id: String,
    prn: String,
    name: String,
    certificate: String,
    approvedAt: { type: Date, default: Date.now } // Timestamp for tracking
});

module.exports = mongoose.model("ApprovedStudent", ApprovedStudentSchema, "approved_students");
