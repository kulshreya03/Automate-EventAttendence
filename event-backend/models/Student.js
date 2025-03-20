const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    prn: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

