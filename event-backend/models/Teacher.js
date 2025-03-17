const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    uname: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
